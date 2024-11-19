document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const checkWinner = () => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        return null;
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            status.textContent = `${winner} venceu!`;
            gameActive = false;
        } else if (!gameBoard.includes('')) {
            status.textContent = 'Empate!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${currentPlayer}'s vez`;
        }
    };

    const handleRestart = () => {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s vez`;

        cells.forEach((cell) => {
            cell.textContent = '';
        });
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    restartButton.addEventListener('click', handleRestart);
});
