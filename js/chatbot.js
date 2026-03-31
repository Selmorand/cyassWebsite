/**
 * CYA Pro Chatbot Widget
 * Embeds on every page. Talks to the chatbot API.
 */
(function () {
  'use strict';

  // === CONFIG ===
  var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  var API_URL = isLocal ? 'http://localhost:3001/api/chat' : '/api/chat';

  // === STATE ===
  var userName = '';
  var chatHistory = [];
  var chatState = 'ask-name'; // 'ask-name' | 'ready'
  var isWaiting = false;

  // === BUILD DOM ===
  function init() {
    // Toggle button
    var toggle = document.createElement('button');
    toggle.className = 'chatbot-toggle';
    toggle.setAttribute('aria-label', 'Chat with us');
    toggle.innerHTML = '<span class="chat-icon">&#128172;</span><span class="close-icon">&#10005;</span>';
    document.body.appendChild(toggle);

    // Chat window
    var win = document.createElement('div');
    win.className = 'chatbot-window';
    win.innerHTML =
      '<div class="chatbot-header">' +
        '<img src="/images/Icon_reverse.png" alt="CYA Pro">' +
        '<div class="chatbot-header-text">' +
          '<h4>CYA Pro Assistant</h4>' +
          '<p>We typically reply instantly</p>' +
        '</div>' +
      '</div>' +
      '<div class="chatbot-messages" id="chatMessages"></div>' +
      '<div class="chatbot-input">' +
        '<input type="text" id="chatInput" placeholder="Type your message..." autocomplete="off">' +
        '<button id="chatSend">Send</button>' +
      '</div>';
    document.body.appendChild(win);

    // Elements
    var messagesEl = document.getElementById('chatMessages');
    var inputEl = document.getElementById('chatInput');
    var sendBtn = document.getElementById('chatSend');

    // Toggle open/close
    toggle.addEventListener('click', function () {
      var isOpen = win.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      if (isOpen) {
        // First open — show greeting
        if (messagesEl.children.length === 0) {
          addBotMessage("Hi there! Welcome to Cover Your Assets. What's your name?");
          inputEl.placeholder = 'Enter your name...';
        }
        inputEl.focus();
      }
    });

    // Send on button click
    sendBtn.addEventListener('click', handleSend);

    // Send on Enter
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    function handleSend() {
      var text = inputEl.value.trim();
      if (!text || isWaiting) return;

      if (chatState === 'ask-name') {
        // Capture name
        userName = text;
        addUserMessage(text);
        inputEl.value = '';
        inputEl.placeholder = 'Type your message...';
        chatState = 'ready';
        addBotMessage("Great to meet you, " + userName + "! How can we assist you today? Ask me anything about CYA Pro — inspections, pricing, how it works, or anything else.");
        return;
      }

      // Normal message
      addUserMessage(text);
      inputEl.value = '';
      sendToAPI(text);
    }

    function addBotMessage(text) {
      var msg = document.createElement('div');
      msg.className = 'chat-msg chat-msg--bot';
      msg.textContent = text;
      messagesEl.appendChild(msg);
      scrollToBottom();
    }

    function addUserMessage(text) {
      var msg = document.createElement('div');
      msg.className = 'chat-msg chat-msg--user';
      msg.textContent = text;
      messagesEl.appendChild(msg);
      scrollToBottom();
    }

    function showTyping() {
      var el = document.createElement('div');
      el.className = 'chat-typing';
      el.id = 'chatTyping';
      el.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(el);
      scrollToBottom();
    }

    function hideTyping() {
      var el = document.getElementById('chatTyping');
      if (el) el.remove();
    }

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function sendToAPI(message) {
      isWaiting = true;
      sendBtn.disabled = true;
      showTyping();

      // Build history (last 10 exchanges max)
      chatHistory.push({ role: 'user', content: message });
      var historyToSend = chatHistory.slice(-20);

      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          message: message,
          history: historyToSend
        })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          hideTyping();
          isWaiting = false;
          sendBtn.disabled = false;

          if (data.error) {
            addBotMessage("Sorry, something went wrong. Please try again or email admin@cyass.co.za for help.");
          } else {
            var reply = data.reply;
            chatHistory.push({ role: 'assistant', content: reply });
            addBotMessage(reply);
          }
          inputEl.focus();
        })
        .catch(function () {
          hideTyping();
          isWaiting = false;
          sendBtn.disabled = false;
          addBotMessage("Sorry, I couldn't connect right now. Please try again or email admin@cyass.co.za.");
          inputEl.focus();
        });
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
