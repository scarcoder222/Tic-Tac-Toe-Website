let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player is 'X', AI is 'O'
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartBtn = document.querySelector(".restart-btn");

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});
restartBtn.addEventListener("click", restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] === "" && currentPlayer === "X") {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWinner(board)) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            return;
        } else if (board.includes("")) {
            currentPlayer = "O";
            aiMove();
        } else {
            statusText.textContent = "It's a draw!";
        }
    }
}

function aiMove() {
    const bestMove = getBestMove(board);
    board[bestMove] = "O";
    cells[bestMove].textContent = "O";
    if (checkWinner(board)) {
        statusText.textContent = "AI wins!";
    } else if (board.includes("")) {
        currentPlayer = "X";
    } else {
        statusText.textContent = "It's a draw!";
    }
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinner(board);
    if (result !== null) {
        return result === "X" ? -10 : result === "O" ? 10 : 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(board) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes("") ? null : "draw";
}

function restartGame() {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = "";
    currentPlayer = "X";
}
