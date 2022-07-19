const canvas = document.getElementById('puissance4')
const ctx = canvas.getContext('2d')
const playerScore = document.getElementById('playerScore')
const reset = document.getElementById('reset')

ctx.strokeStyle = "#000000"

const numberOfXAxisCases = 7
const numberOfYAxisCases = 6

const caseWidth = canvas.width/numberOfXAxisCases
const caseHeight = canvas.height/numberOfYAxisCases

let playerTurn = 'blue'
let lineIndex;
let columnIndex;
let isGameOver = false

// Un array pour chaque colonne

const score = {
    playerBlue: 0,
    playerRed: 0
}

let dummyArray = [
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
    [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}]
]

const incrementingScore = (playerTurn) => {
    if (playerTurn === "blue") {
        score.playerBlue++
    } else {
        score.playerRed++
    }
}

const displayScore = () => {
    playerScore.innerText = `Player Blue : ${score.playerBlue}
    Player Red : ${score.playerRed}`
}

const drawCircle = (x, tokenColor) => {
    let newY;
    let numberofCasesFull = 0
    for (const item of dummyArray[columnIndex]) {
        if (item.player === "") {
            numberofCasesFull++
        }
    }
    newY = numberofCasesFull*caseHeight-25
    ctx.fillStyle = tokenColor;
    ctx.beginPath()
    ctx.arc(x, newY, 10, 0, Math.PI * 2, false)
    ctx.fill()
}

const gameTurn = (x, dummyArray, tokenColor) => {
    addToDummyArrayAndDraw(x, dummyArray, tokenColor)
    winningCondition()
    if (playerTurn === 'blue') {
        return playerTurn = 'red'
    }
        return playerTurn = 'blue'
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

const findColumnIndex = (x) => {
    const columnNumber = (x/100)*2
    columnIndex = Math.floor(columnNumber)
}

const addToDummyArrayAndDraw = (x) => {
    let test = 0
    findColumnIndex(x)
    for (let xNewTurn = 0; xNewTurn < dummyArray.length; xNewTurn++) {
        if (xNewTurn === columnIndex && dummyArray[xNewTurn].length <= numberOfYAxisCases) {
            drawCircle(x, playerTurn)
            for (let yNewTurn = 0; yNewTurn < dummyArray[xNewTurn].length; yNewTurn++) {
                for (const item of dummyArray[xNewTurn]) {
                    if (item.player !== "") {
                        test++
                    }
                }
                dummyArray[xNewTurn][test].player = playerTurn
                break;
            }
        }
    }
}

const winningCondition = () => {
    for (let line = 0; line < numberOfYAxisCases-3; line++) {
        for (let column = 0; column < numberOfXAxisCases; column++) {
            if (dummyArray[column][line].player === playerTurn 
                && dummyArray[column][line+1].player === playerTurn 
                && dummyArray[column][line+2].player === playerTurn 
                && dummyArray[column][line+3].player === playerTurn) {
                console.log(`Winner : ${playerTurn}`)
                isGameOver = true;
                incrementingScore(playerTurn)
                break;
            }
        }
    }

    for (let line = 0; line < numberOfYAxisCases; line++) {
        for (let column = 0; column < numberOfXAxisCases-3; column++) {
            if (dummyArray[column][line].player === playerTurn 
                && dummyArray[column+1][line].player === playerTurn 
                && dummyArray[column+2][line].player === playerTurn 
                && dummyArray[column+3][line].player === playerTurn) {
                console.log(`Winner : ${playerTurn}`)
                isGameOver = true;
                incrementingScore(playerTurn)
                break;
            }
        }
    }

    for (let line = 0; line < numberOfYAxisCases-3; line++) {
        for (let column = 0; column < numberOfXAxisCases-3; column++) {
            if (dummyArray[column][line].player === playerTurn 
                && dummyArray[column+1][line+1].player === playerTurn 
                && dummyArray[column+2][line+2].player === playerTurn 
                && dummyArray[column+3][line+3].player === playerTurn) {
                console.log(`Winner : ${playerTurn}`)
                isGameOver = true;
                incrementingScore(playerTurn)
                break;
            }
        }
    }

    for (let line = 3; line < numberOfYAxisCases; line++) {
        for (let column = 0; column < numberOfXAxisCases-3; column++) {
            if (dummyArray[column][line].player === playerTurn 
                && dummyArray[column+1][line-1].player === playerTurn 
                && dummyArray[column+2][line-2].player === playerTurn 
                && dummyArray[column+3][line-3].player === playerTurn) {
                console.log(`Winner : ${playerTurn}`)
                isGameOver = true;
                incrementingScore(playerTurn)
                break;
            }
        }
    }
}

drawGameGrid()

canvas.addEventListener("click", e => {
    if (isGameOver === true) {
        return;
    }
    let mouseX = e.clientX;
    gameTurn(mouseX, 275, dummyArray, playerTurn)
    displayScore()
});

reset.addEventListener("click", () => {
    isGameOver = false
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGameGrid()
    dummyArray = [
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}],
        [{player:""},{player:""},{player:""},{player:""},{player:""},{player:""}]
    ]
    playerTurn = "blue"
})