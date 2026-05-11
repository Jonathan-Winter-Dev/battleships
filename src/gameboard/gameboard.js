import { Ship } from "./../ship/ship.js"

export class Gameboard {
    constructor(s){
        this.board = createBoard()
    }
    placeShip(length, startPosition, finishPosition) {
        //if the ship cannot fit in to the attempted position, then return false
        if (canShipFit(length, startPosition, finishPosition) === false) return false        
        const ship = new Ship(length)

    }
}

function createBoard() {
    const rows = []
    //creates a 10 * 10 gameboard 
    for (let i = 0; i < 10; i++) {
        rows[i] = []
        for (let j = 0; j < 10; j++){
            rows[i].push(0)
        }
    }
    return rows
}

// const board = new Gameboard()

// console.log(board.board)