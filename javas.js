const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const resultMessage = document.getElementById('resultMessage');
const turnMessage = document.getElementById('turnMessage');
let oTurn;

startGame();

resetButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    resultMessage.innerText = '';
    updateTurnMessage();
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateTurnMessage();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw, currentClass) {
    if (draw) {
        resultMessage.innerText = 'Draw!';
    } else {
        resultMessage.innerText = `${currentClass.toUpperCase()} Wins!`;
    }
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    turnMessage.innerText = '';
}

function updateTurnMessage() {
    const currentTurn = oTurn ? "O's Turn" : "X's Turn";
    turnMessage.innerText = currentTurn;
}
