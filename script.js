// Chatroom functionality using localStorage (for real-time messaging between tabs)
const chatInput = document.getElementById('chatInput');
const messagesContainer = document.getElementById('messages');
const sendMessageButton = document.getElementById('sendMessage');

// Function to update chat messages from localStorage
function updateChat() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messagesContainer.innerHTML = '';
  messages.forEach(msg => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messagesContainer.appendChild(messageElement);
  });
}

// Handle sending chat messages
sendMessageButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    chatInput.value = '';
    updateChat();
  }
});

// Initialize chat when page loads
updateChat();

// Tic-Tac-Toe Game Logic
let gameBoard = Array(9).fill(null); // Tic-Tac-Toe grid
let currentPlayer = 'X';
let gameStarted = false;

// Elements for the game
const gameBoardElement = document.getElementById('gameBoard');
const gameStatusElement = document.getElementById('gameStatus');
const startGameButton = document.getElementById('startGame');

// Start the game
startGameButton.addEventListener('click', () => {
  gameBoard = Array(9).fill(null); // Reset the board
  currentPlayer = 'X'; // Player X always starts
  gameStarted = true;
  gameStatusElement.textContent = "Player X's turn";
  gameBoardElement.classList.remove('hidden');
  renderGameBoard();
});

// Handle a move on the Tic-Tac-Toe board
function handleMove(index) {
  if (gameBoard[index] || !gameStarted) return; // Ignore if cell is taken or game isn't started
  gameBoard[index] = currentPlayer;
  renderGameBoard();
  if (checkWinner()) {
    gameStatusElement.textContent = `Player ${currentPlayer} wins!`;
    gameStarted = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  gameStatusElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Render the Tic-Tac-Toe board
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

// Check if there is a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}
