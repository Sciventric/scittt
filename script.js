// Select all cells and other elements
const cells = document.querySelectorAll('[data-cell]');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X'; // Starting player
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let isGameActive = true; // Flag to track if the game is active

// Function to reset the game
function resetGame() {
  // Reset game variables and elements
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  winnerText.innerText = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#000';
    cell.style.color = 'neonyellow'; // Change font color to neon yellow
    cell.style.pointerEvents = 'auto';
    cell.addEventListener('click', handleCellClick, { once: true }); // Add click event listeners again
  });
  currentPlayer = 'X'; // Reset to the starting player 'X'
}

// Event listener for the restart button
restartButton.addEventListener('click', resetGame);

// Function to handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // Check if the cell is already filled or the game is not active
  if (gameBoard[cellIndex] !== '' || !isGameActive) {
    return;
  }

  placeMark(cell, cellIndex); // Place the current player's mark in the cell
  checkWin(); // Check if there's a winner
  checkDraw(); // Check for a draw

  // Switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // If it's the computer's turn (player 'O'), make a move after a delay
  if (currentPlayer === 'O') {
    setTimeout(makeComputerMove, 500);
  }
}

// Function to place a mark in the cell
function placeMark(cell, cellIndex) {
  cell.textContent = currentPlayer;
  gameBoard[cellIndex] = currentPlayer;
  cell.style.pointerEvents = 'none'; // Disable further clicks in this cell
}

// Function to check for a win
function checkWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      isGameActive = false;
      highlightWinningCombo(combo);
      winnerText.innerText = `${gameBoard[a]} wins!`;
    }
  }
}

// Function to highlight the winning combo
function highlightWinningCombo(combo) {
  for (const index of combo) {
    cells[index].style.backgroundColor = '#0f0';
  }
}

// Function to check for a draw
function checkDraw() {
  if (!gameBoard.includes('') && isGameActive) {
    isGameActive = false;
    winnerText.innerText = "It's a draw!";
  }
}

// Function for the computer's move
function makeComputerMove() {
  const emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index);
    return acc;
  }, []);

  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const randomCell = cells[randomIndex];

  placeMark(randomCell, randomIndex);

  currentPlayer = 'X'; // Switch back to player 'X'
}

// Add initial event listeners for cell clicks
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

// Call resetGame to set the initial font color to neon yellow
resetGame();
