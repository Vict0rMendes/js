const board = document.getElementById('board');
const cells = board.getElementsByTagName('td');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resetarBtn = document.getElementById('resetar-btn');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
let currentPlayer = '';
let scoreX = 0;
let scoreO = 0;
let gameOver = false;
let winningCells = [];

const gameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateBoard(row, col) {
    gameState[row][col] = currentPlayer;
    cells[row * 3 + col].textContent = currentPlayer;
}

function checkWinner() {
    const winPatterns = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const [rowA, colA] = a;
        const [rowB, colB] = b;
        const [rowC, colC] = c;

        if (
            gameState[rowA][colA] !== '' &&
            gameState[rowA][colA] === gameState[rowB][colB] &&
            gameState[rowA][colA] === gameState[rowC][colC]
        ) {
            winningCells = [a, b, c];
            return gameState[rowA][colA];
        }
    }

    const isFull = gameState.every(row => row.every(cell => cell !== ''));

    if (isFull) {
        return 'Empate';
    }

    return '';
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (winner === 'O') {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function handleCellClick() {
    const row = Math.floor(this.parentNode.rowIndex);
    const col = Math.floor(this.cellIndex);

    if (gameState[row][col] !== '' || currentPlayer === '' || gameOver) {
        return;
    }

    updateBoard(row, col);
    const winner = checkWinner();

    if (winner !== '') {
        updateScore(winner);
        gameOver = true;

        if (winner !== 'Empate') {
            for (const [row, col] of winningCells) {
                cells[row * 3 + col].classList.add('vencedor');
            }
        }else if(winner == 'Empate'){
            Array.from(cells).forEach(cell => {
                cell.classList.add('empate');
            });
        }
        restartBtn.disabled = false;
    } else {
        switchPlayer();
    }
}

function addCellClickHandlers() {
    Array.from(cells).forEach(cell => cell.addEventListener('click', handleCellClick));
}

function removeCellClickHandlers() {
    Array.from(cells).forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function restartGame() {
    switchPlayer();
    gameState.forEach(row => row.fill(''));
    Array.from(cells).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('vencedor');
        cell.classList.remove('empate');
    });
    restartBtn.disabled = true;
    gameOver = false;
    winningCells = [];
}

function resetarGame() {
    restartGame();
    Array.from(cells).forEach(cell => {
        cell.classList.remove('pointers');
    });
    removeCellClickHandlers();
    currentPlayer = 'X';
    scoreO = 0;
    scoreX = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
    startBtn.disabled = false;
    resetarBtn.disabled = true;
}

function startGame() {
    currentPlayer = 'X';
    addCellClickHandlers();
    Array.from(cells).forEach(cell => {
        cell.classList.add('pointers');
    });
    restartBtn.disabled = true;
    startBtn.disabled = true;
    resetarBtn.disabled =false;
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
resetarBtn.addEventListener('click', resetarGame);