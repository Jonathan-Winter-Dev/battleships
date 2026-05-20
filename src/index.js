import "./styles.css";
import { Player } from "./player/player.js"

const player1 = new Player(false, "player1")
const player2 = new Player(false, "player2")


placeSomeShips(player1)
placeSomeShips(player2)


displayBoard(player1.player, player1.board, document.querySelector(".playerOneBoard"))


function changePlayer(player) {
    if (player === "player2") {
        displayBoard(player1.player, player1.board, document.querySelector(".playerOneBoard"))
        console.log(`player1's turn`)
    } else {
        displayBoard(player2.player, player2.board, document.querySelector(".playerTwoBoard"))
        console.log(`player2's turn`)
    }
}

function placeSomeShips(player) {
    player.board.placeShip(3, 10, "horizontal")
    player.board.placeShip(6, 9, "vertical")
    player.board.placeShip(4, 90, "horizontal")
    player.board.placeShip(2, 45, "horizontal")
    player.board.placeShip(6, 32, "vertical")
}

function displayBoard(player, board, div) {
    div.innerHTML = ""
    let count = 0
    for (let i = 0; i < 10; i += 1) {
        const row = document.createElement("div")
        row.classList.add("row")

        for (let j = count; j < count + 10; j++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")

            const position = board.getDataByCoordinate(j)

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
                    board.receiveAttack(j)
                    displayBoard(player, board, div)
                    changePlayer(player)
                })
            }
            row.append(cell)
        }
        div.append(row)
        count += 10
    }
}