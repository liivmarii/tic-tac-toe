const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restart-button')

let currentClass

const oScoreText = document.getElementById('o-score')
const xScoreText = document.getElementById('x-score')

let oScore = 0
let xScore = 0
let oTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    cellElements.forEach( cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')

    console.log('o score: ' + oScore)
    console.log('x score: ' + xScore)
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'draw!'
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "o's" : "x's"} win!`

        if (currentClass === O_CLASS) {
            oScore++
            oScoreText.innerText = oScore
        }
        else {
            xScore++
            xScoreText.innerText = xScore
        }
    }

    winningMessageElement.classList.add('show')
}

function handleClick(e) {
    const cell = e.target
    currentClass = oTurn ? O_CLASS : X_CLASS

    placeMark(cell, currentClass)

    if (checkWin(currentClass)) endGame(false)
    else if (isDraw()) endGame(true)
    else {
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some( combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}