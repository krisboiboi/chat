// Get DOM elements for username setup
const usernameContainer = document.getElementById('usernameContainer');
const usernameInput = document.getElementById('usernameInput');
const setUsernameButton = document.getElementById('setUsernameButton');

// Get the username from localStorage or set it if not present
let username = localStorage.getItem('username');

if (!username) {
  // If username is not set, show the username setup screen
  usernameContainer.style.display = 'flex';
  setUsernameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem('username', username);
      usernameContainer.style.display = 'none'; // Hide username setup
      updateChat(); // Update chat display with new username
    }
  });
} else {
  // If username is set, immediately hide the username setup
  usernameContainer.style.display = 'none';
}

// Update the chat messages
function updateChat() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
    messagesContainer.appendChild(messageElement);
  });
}

// Handle sending chat messages
document.getElementById('sendMessage').addEventListener('click', () => {
  const messageText = document.getElementById('chatInput').value.trim();
  if (messageText) {
    const message = {
      username,
      text: messageText
    };
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    document.getElementById('chatInput').value = '';
    updateChat();
  }
});

// Initial chat load
updateChat();

