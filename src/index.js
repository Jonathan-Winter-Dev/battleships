import "./styles.css";
import { Player } from "./player/player.js"
import { GameController  } from "./game-controller/game-controller.js";

// const player1 = new Player(false, "player1")
// const player2 = new Player(false, "player2")

const gameController =  new GameController()
gameController.addPlayer(false, "Jon")
gameController.addPlayer(false, "Maddy")

const playersArr = gameController.getPlayers()
playersArr.forEach((player) => placeSomeShips(player))


document.querySelector(".playersTurn").innerText = "Player 1's Turn"

displayGameState(playersArr[0])


function placeSomeShips(player) {
    player.board.placeShip(3, 10, "horizontal")
    player.board.placeShip(6, 9, "vertical")
    player.board.placeShip(4, 90, "horizontal")
    player.board.placeShip(2, 45, "horizontal")
    player.board.placeShip(6, 32, "vertical")
}

function displayPlayerName(playerName) {
    const div = document.querySelector(".playersTurn")
    div.innerText = playerName
}

function displayGameState(player) {
    displayPlayerName(player.name)
    displayGameBoard(player)
}

function displayGameBoard(player) {
    const div = document.querySelector(".playerBoard")
    div.innerHTML = ""
    let count = 0
    for (let i = 0; i < 10; i += 1) {
        const row = document.createElement("div")
        row.classList.add("row")

        for (let j = count; j < count + 10; j++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")

            const position = player.board.getDataByCoordinate(j)

            if (position.ship !== null) {
                cell.classList.add("ship")
            }

            if (position.isHit) {
                cell.classList.add("hit")
            }
            
            cell.innerText = j
            //only attach eventlisteners to cells that haven't been hit yet to avoid hitting them again
            if (position.isHit === false) {
                cell.addEventListener("click", () => {
                    player.board.receiveAttack(j)
                    if (gameController.checkWinner(player)) {
                        alert(`${player.name} won!`)
                    }
                    displayGameState(gameController.switchPlayer(player))
                })
            }
            row.append(cell)
        }
        div.append(row)
        count += 10
    }
}