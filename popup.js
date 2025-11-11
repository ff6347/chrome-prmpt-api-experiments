// Chrome Prompt API Integration
let session = null;

// DOM Elements
const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-prompt');
const clearButton = document.getElementById('clear-button');
const responseOutput = document.getElementById('response-output');
const loadingIndicator = document.getElementById('loading');
const statusText = document.getElementById('status-text');
const statusBox = document.getElementById('api-status');

// Initialize on popup load
document.addEventListener('DOMContentLoaded', async () => {
  await checkAPIAvailability();
  await initializeSession();
});

// Check if Prompt API is available
async function checkAPIAvailability() {
  try {
    if (!window.ai || !window.ai.languageModel) {
      updateStatus('unavailable', 'Prompt API not available. Check Chrome flags.');
      sendButton.disabled = true;
      return false;
    }

    const availability = await window.ai.languageModel.capabilities();

    if (availability.available === 'readily') {
      updateStatus('ready', 'API Ready');
      return true;
    } else if (availability.available === 'after-download') {
      updateStatus('downloading', 'Model needs to be downloaded');
      sendButton.disabled = true;
      return false;
    } else {
      updateStatus('unavailable', 'API not available');
      sendButton.disabled = true;
      return false;
    }
  } catch (error) {
    console.error('Error checking API availability:', error);
    updateStatus('error', `Error: ${error.message}`);
    sendButton.disabled = true;
    return false;
  }
}

// Initialize a language model session
async function initializeSession() {
  try {
    if (!window.ai || !window.ai.languageModel) {
      return;
    }

    session = await window.ai.languageModel.create({
      systemPrompt: 'You are a helpful AI assistant integrated into a Chrome extension.'
    });

    console.log('Session initialized successfully');
  } catch (error) {
    console.error('Error initializing session:', error);
    updateStatus('error', `Session error: ${error.message}`);
  }
}

// Update API status display
function updateStatus(status, message) {
  statusText.textContent = message;
  statusBox.className = 'status-box status-' + status;

  const indicator = statusBox.querySelector('.status-indicator');
  switch(status) {
    case 'ready':
      indicator.textContent = '✅';
      break;
    case 'unavailable':
      indicator.textContent = '❌';
      break;
    case 'downloading':
      indicator.textContent = '⬇️';
      break;
    case 'error':
      indicator.textContent = '⚠️';
      break;
    default:
      indicator.textContent = '⏳';
  }
}

// Send prompt to the API
async function sendPrompt() {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert('Please enter a prompt');
    return;
  }

  if (!session) {
    await initializeSession();
    if (!session) {
      alert('Could not initialize AI session');
      return;
    }
  }

  try {
    // Show loading state
    sendButton.disabled = true;
    loadingIndicator.classList.remove('hidden');
    responseOutput.innerHTML = '<span class="placeholder">Generating...</span>';

    // Send prompt and get response
    const response = await session.prompt(prompt);

    // Display response
    displayResponse(response);

  } catch (error) {
    console.error('Error sending prompt:', error);
    displayError(`Error: ${error.message}`);
  } finally {
    // Hide loading state
    sendButton.disabled = false;
    loadingIndicator.classList.add('hidden');
  }
}

// Display the AI response
function displayResponse(text) {
  responseOutput.innerHTML = '';
  const pre = document.createElement('pre');
  pre.textContent = text;
  responseOutput.appendChild(pre);
}

// Display error message
function displayError(message) {
  responseOutput.innerHTML = '';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  responseOutput.appendChild(errorDiv);
}

// Clear input and output
function clearAll() {
  promptInput.value = '';
  responseOutput.innerHTML = '<span class="placeholder">Response will appear here...</span>';
}

// Event listeners
sendButton.addEventListener('click', sendPrompt);
clearButton.addEventListener('click', clearAll);

// Allow Enter key to send (Shift+Enter for new line)
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendPrompt();
  }
});

// Clean up session when popup closes
window.addEventListener('beforeunload', () => {
  if (session) {
    session.destroy();
  }
});
