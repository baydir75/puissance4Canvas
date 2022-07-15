const canvas = document.getElementById('puissance4')
const ctx = canvas.getContext('2d')

ctx.strokeStyle = "#000000"

const numberOfXAxisCases = 7
const numberOfYAxisCases = 6

const caseWidth = canvas.width/numberOfXAxisCases
const caseHeight = canvas.height/numberOfYAxisCases

let playerTurn = 'blue'
let isPlayerTurnOver = false
let wrongLine = false
let isCaseEmpty = true
let foundEmptyCase = false
let lineIndex;
let columnIndex;

const dummyArray = [
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}]
]

const findColumnIndexAndLineIndex = (x, y) => {
    const columnNumber = (x/100)*2
    columnIndex = Math.floor(columnNumber)
    const lineNumber = (y/100)*2
    lineIndex = Math.floor(lineNumber)
}

const checkCase = (x, y, game, tokenColor) => {
    findColumnIndexAndLineIndex(x, y)
    console.log(columnIndex, lineIndex)
    if (!game[lineIndex][columnIndex].hasOwnProperty("player")) {
        game[lineIndex][columnIndex].player = tokenColor
        foundEmptyCase = true
        return
    }
    foundEmptyCase = false
}

const drawCircle = (x, y, tokenColor) => {
    ctx.fillStyle = tokenColor;
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2, false)
    ctx.fill()
}

const checkAndDraw = (x, y, game, tokenColor) => {
    checkCase(x, y, game, tokenColor)
    if (foundEmptyCase === true) {
        drawCircle(x, y, tokenColor)
        foundEmptyCase = false
    } else {
        return checkAndDraw(x, y-caseHeight, game, tokenColor)
    }
}

const gameTurn = (x, y, game, tokenColor) => {
    checkAndDraw(x, y, game, tokenColor)
    //checkIfGameMetWinningConditions(x,y)
    // if (playerTurn === 'blue') {
    //     return playerTurn = 'red'
    //  }
    // return playerTurn = 'blue'
}

const drawGameGrid = () => {
    for (yAxis = 0; yAxis <= canvas.height; yAxis += caseHeight) {
        ctx.moveTo(0, yAxis);
        ctx.lineTo(canvas.width, yAxis);
        ctx.stroke();
    }
    for (xAxis = 0; xAxis <= canvas.width; xAxis += caseWidth) {
        ctx.moveTo(xAxis, 0);
        ctx.lineTo(xAxis, canvas.height);
        ctx.stroke();
    }
}

// const checkIfGameMetWinningConditions = (x,y) => {
//     findColumnIndexAndLineIndex(x, y)
//     console.log(dummyArray[lineIndex][columnIndex].player, playerTurn, dummyArray[lineIndex][columnIndex+1])
//     if (dummyArray[lineIndex][columnIndex].player === playerTurn && dummyArray[lineIndex][columnIndex+1].player === playerTurn && dummyArray[lineIndex][columnIndex+=2].player === playerTurn && dummyArray[lineIndex][columnIndex+=3].player === playerTurn) {
//         console.log("Win")
//     }

//     if (dummyArray[lineIndex][columnIndex].player === playerTurn && dummyArray[lineIndex][columnIndex+1].player === playerTurn && dummyArray[lineIndex][columnIndex+2].player === playerTurn && dummyArray[lineIndex][columnIndex+3].player === playerTurn) {
//         console.log("Win")
//     }
// }

drawGameGrid()

canvas.addEventListener("click", e => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    gameTurn(mouseX, mouseY, dummyArray, playerTurn)
    if (playerTurn === 'blue') {
        return playerTurn = 'red'
     }
    return playerTurn = 'blue'
});
