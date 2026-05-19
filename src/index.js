import "./styles.css";
import { Player } from "./player/player.js"

const player1 = new Player(false)
const player2 = new Player(false)


placeSomeShips(player1)
placeSomeShips(player2)




displayBoard(player1.board, document.querySelector(".playerOneBoard"))
displayBoard(player2.board, document.querySelector(".playerTwoBoard"))

function placeSomeShips(player) {
    player.board.placeShip(3, 10, "horizontal")
    player.board.placeShip(6, 9, "vertical")
    player.board.placeShip(4, 90, "horizontal")
    player.board.placeShip(2, 45, "horizontal")
    player.board.placeShip(6, 32, "vertical")
}

function displayBoard(board, div) {
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
            } else {
                cell.innerText = j
            }
            cell.addEventListener("click", () => {
                board.receiveAttack(j)
                cell.classList.add("hit")
                console.log(board.getDataByCoordinate(j))
            })
            row.append(cell)
        }
        div.append(row)
        count += 10
    }
}