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
// Get DOM elements for the game
const gameBoardElement = document.getElementById('gameBoard');
const gameStatusElement = document.getElementById('gameStatus');
const startGameButton = document.getElementById('startGame');

let gameBoard = Array(9).fill(null);
let currentPlayer = 'X';
let gameStarted = false;
let winner = null;

// Start the Tic-Tac-Toe game
startGameButton.addEventListener('click', () => {
  gameBoard = Array(9).fill(null); // Reset board
  currentPlayer = 'X'; // Player X always starts
  winner = null; // Reset winner
  gameStarted = true;
  gameStatusElement.textContent = `Player X's turn`;
  gameBoardElement.classList.remove('hidden');
  renderGameBoard();
});

// Render the Tic-Tac-Toe game board
function renderGameBoard() {
  gameBoardElement.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleMove(index));
    gameBoardElement.appendChild(cellElement);
  });
}

// Handle a move in the game
function handleMove(index) {
  if (gameBoard[index] || !gameStarted || winner) return; // Ignore invalid moves
  gameBoard[index] = currentPlayer;
  renderGameBoard();
  if (checkWinner()) {
    gameStatusElement.textContent = `Player ${currentPlayer} wins!`;
    winner = currentPlayer;
    gameStarted = false;
    return;
  } else if (gameBoard.every(cell => cell !== null)) {
    gameStatusElement.textContent = `It's a tie!`;
    gameStarted = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  gameStatusElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}


