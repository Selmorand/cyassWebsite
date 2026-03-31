require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const nodemailer = require('nodemailer');

const app = express();

// Only allow requests from your own domain
const allowedOrigins = [
  'https://cyass.co.za',
  'https://www.cyass.co.za',
  'http://localhost:8080',  // local dev — remove in production
  'http://127.0.0.1:8080'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}));
app.use(express.json());

// === EMAIL ALERTS ===
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true, // port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Track alerts to avoid spamming your inbox
let lastAlertTime = 0;
const ALERT_COOLDOWN = 30 * 60 * 1000; // 30 minutes between alerts
let errorCount = 0;
let lastErrorReset = Date.now();

function sendAlert(subject, body) {
  const now = Date.now();
  if (now - lastAlertTime < ALERT_COOLDOWN) return; // don't spam
  lastAlertTime = now;

  transporter.sendMail({
    from: `"CYA Pro Chatbot" <${process.env.SMTP_USER}>`,
    to: process.env.ALERT_EMAIL,
    subject: `[CYA Pro Alert] ${subject}`,
    text: body
  }).then(() => {
    console.log('Alert email sent:', subject);
  }).catch(err => {
    console.error('Failed to send alert email:', err.message);
  });
}

// === RATE LIMITING (in-memory, per IP) ===
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10;            // max 10 messages per minute per IP

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip).filter(t => now - t < RATE_LIMIT_WINDOW);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  if (timestamps.length > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many messages. Please wait a moment and try again.' });
  }
  next();
}

// Clean up rate limit map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap) {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (valid.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, valid);
  }
}, 5 * 60 * 1000);

// Reset error counter every hour
setInterval(() => {
  errorCount = 0;
  lastErrorReset = Date.now();
}, 60 * 60 * 1000);

// Load knowledge base
const knowledgeBase = fs.readFileSync(path.join(__dirname, 'knowledgebase.txt'), 'utf-8');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

// Question log file for building knowledge base
const questionLogFile = path.join(logsDir, 'questions.jsonl');

// Anthropic client (reads ANTHROPIC_API_KEY from environment)
const client = new Anthropic();

const SYSTEM_PROMPT = `You are the Cover Your Assets virtual assistant, a friendly and helpful chatbot on the Cover Your Assets website (cyass.co.za). Your job is to answer questions about CYA Pro, the property condition inspection app built for South Africa.

KNOWLEDGE BASE:
${knowledgeBase}

RULES:
- Always be friendly, professional, and concise.
- Answer ONLY based on the knowledge base above. Do not make up information.
- If you do not know the answer, say so honestly and direct them to admin@cyass.co.za.
- When relevant, encourage users to sign up at https://app.cyass.co.za/signup.
- Keep responses short (2-4 sentences max) unless the user asks for detail.
- Use South African English spelling (e.g. colour, organised, favour).
- Do not use markdown formatting. Use plain text only.
- The user's name will be provided. Use it occasionally to keep the conversation personal.
- If asked about pricing, always mention the free tier first.
- If asked something completely unrelated to CYA Pro or property inspections, politely redirect.`;

// Chat endpoint
app.post('/api/chat', rateLimit, async (req, res) => {
  const { name, message, history } = req.body;

  if (!message || !name) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  // Sanitise inputs — reject anything suspiciously long
  if (name.length > 100 || message.length > 1000) {
    return res.status(400).json({ error: 'Message too long.' });
  }

  // Cap history to prevent abuse
  const safeHistory = (Array.isArray(history) ? history : []).slice(-10);

  // Log the question
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    name,
    question: message
  };
  fs.appendFileSync(questionLogFile, JSON.stringify(logEntry) + '\n');

  // Build message history for context
  const messages = [];
  safeHistory.forEach(h => {
    if (h.role === 'user' || h.role === 'assistant') {
      messages.push({ role: h.role, content: String(h.content).slice(0, 1000) });
    }
  });
  messages.push({ role: 'user', content: `My name is ${name}. ${message}` });

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages
    });

    const reply = response.content[0].text;
    errorCount = 0; // reset on success
    res.json({ reply });
  } catch (err) {
    console.error('Claude API error:', err.message);
    errorCount++;

    // Determine the alert type
    if (err.status === 401 || err.message.includes('authentication')) {
      sendAlert('API Key Invalid',
        'The Anthropic API key has been rejected. The chatbot is DOWN.\n\n' +
        'Error: ' + err.message + '\n\n' +
        'Action needed: Check your API key at https://console.anthropic.com/settings/keys\n' +
        'Then update the .env file on the server and restart the chatbot service.');
    } else if (err.status === 429 || err.message.includes('rate') || err.message.includes('limit') || err.message.includes('quota') || err.message.includes('credit')) {
      sendAlert('Spending Limit or Rate Limit Reached',
        'The Anthropic API is rejecting requests — you may have hit your spending limit. The chatbot is DOWN.\n\n' +
        'Error: ' + err.message + '\n\n' +
        'Action needed: Check your usage at https://console.anthropic.com/settings/usage\n' +
        'Top up credit or increase your spending limit at https://console.anthropic.com/settings/limits');
    } else if (errorCount >= 3) {
      sendAlert('Chatbot Errors (' + errorCount + ' in the last hour)',
        'The chatbot has failed ' + errorCount + ' times in the past hour.\n\n' +
        'Latest error: ' + err.message + '\n\n' +
        'This could be a temporary Anthropic outage or a configuration issue.\n' +
        'Check the server logs for more detail.');
    }

    res.status(500).json({ error: 'Sorry, something went wrong. Please try again.' });
  }
});

// Get logged questions (protected — only from localhost)
app.get('/api/questions', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  if (ip !== '127.0.0.1' && ip !== '::1' && ip !== '::ffff:127.0.0.1') {
    return res.status(403).json({ error: 'Access denied.' });
  }

  if (!fs.existsSync(questionLogFile)) {
    return res.json({ questions: [] });
  }
  const lines = fs.readFileSync(questionLogFile, 'utf-8').trim().split('\n').filter(Boolean);
  const questions = lines.map(l => JSON.parse(l));
  res.json({ questions });
});

// Status endpoint — check from anywhere
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    errors_this_hour: errorCount,
    uptime_seconds: Math.floor(process.uptime()),
    last_error_reset: new Date(lastErrorReset).toISOString()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CYA Pro chatbot API running on port ${PORT}`);

  // Send a startup notification
  sendAlert('Chatbot Started',
    'The CYA Pro chatbot API has started successfully on port ' + PORT + '.\n' +
    'Time: ' + new Date().toISOString());
});
