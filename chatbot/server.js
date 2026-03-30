const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Load knowledge base
const knowledgeBase = fs.readFileSync(path.join(__dirname, 'knowledgebase.txt'), 'utf-8');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

// Question log file for building knowledge base
const questionLogFile = path.join(logsDir, 'questions.jsonl');

// Anthropic client (reads ANTHROPIC_API_KEY from environment)
const client = new Anthropic();

const SYSTEM_PROMPT = `You are the CoverAss virtual assistant, a friendly and helpful chatbot on the CoverAss website (cyass.co.za). Your job is to answer questions about CoverAss, the property condition inspection app built for South Africa.

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
- If asked something completely unrelated to CoverAss or property inspections, politely redirect.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { name, message, history } = req.body;

  if (!message || !name) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  // Log the question
  const logEntry = {
    timestamp: new Date().toISOString(),
    name,
    question: message
  };
  fs.appendFileSync(questionLogFile, JSON.stringify(logEntry) + '\n');

  // Build message history for context
  const messages = [];

  if (history && Array.isArray(history)) {
    history.forEach(h => {
      messages.push({ role: h.role, content: h.content });
    });
  }

  messages.push({ role: 'user', content: `My name is ${name}. ${message}` });

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages
    });

    const reply = response.content[0].text;

    res.json({ reply });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: 'Sorry, something went wrong. Please try again.' });
  }
});

// Get logged questions (for knowledge base review)
app.get('/api/questions', (req, res) => {
  if (!fs.existsSync(questionLogFile)) {
    return res.json({ questions: [] });
  }
  const lines = fs.readFileSync(questionLogFile, 'utf-8').trim().split('\n').filter(Boolean);
  const questions = lines.map(l => JSON.parse(l));
  res.json({ questions });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CoverAss chatbot API running on port ${PORT}`);
});
