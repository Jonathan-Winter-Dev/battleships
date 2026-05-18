import { Ship } from "./../ship/ship.js"

export class Gameboard {
    constructor(s){
        this.board = createBoard()
    }
    placeShip(length, startPosition, orientation) {
        //if the ship cannot fit in to the attempted position, then return false
        if (validShipPlacement(length, startPosition, orientation, this.board) === false) return false        
        

        if (orientation === "vertical") {
            this.board = createShipVertically(length, startPosition, this.board)
        }
        if (orientation === "horizontal") {
            this.board = createShipHorizontally(length, startPosition, this.board)
        }
    }
}

function createShipVertically(length, startPosition, gameboard) {
    const ship = new Ship(length)
    const verticalLength = length * 10
    const endPosition = length + verticalLength

    for (let i = startPosition; i < endPosition; i += 10) {
        gameboard[i].ship = ship
    }
    
    return gameboard
}

function createShipHorizontally(length, startPosition, gameboard) {
    const ship = new Ship(length)
    const endPosition = startPosition + length

    for (let i = startPosition; i < endPosition; i++) {
        gameboard[i].ship = ship
    }

    return gameboard
}

export function validShipPlacement(length, startPosition, orientation, gameboard) {

    if (orientation === "horizontal") {
        const endPosition = length + startPosition

        // returns false if the position is out of bounds of the board
        if (endPosition > 99) return false

        //checks that the ship does not "wrap" to a new line on the first line
        if (startPosition <= 9 && endPosition >= 10) {
            return false
        } else if (startPosition >= 10){
            //checks that the ship does not "wrap" to a new line on all other lines
            //by comparing the first digit of the start and end positions. 
            const startPositionString = startPosition.toString()
            const endPositionString = endPosition.toString()

            if(startPositionString[0] !== endPositionString[0]) return false
        }
        //checks to ensure that a ship is not being places on top of another ship
        for (let i = startPosition; i < endPosition; i++) {
            if (gameboard[i].ship != null) return false
        }

        //returns true if it is a valid ship locations
        return true
    } else if (orientation === "vertical") {
        const verticalLength = length * 10
        const endPosition = startPosition + verticalLength

        //returns false if out of upper bounds of the board
        if (endPosition > 99) return false

        //checks to ensure that a ship is not being places on top of another ship
        for (let i = startPosition; i < endPosition; i += 10) {
            console.log(i)
            if (gameboard[i].ship !== null) return false
        }

        //returns true if all other cases are correct
        return true
    }
}

function createBoard() {
    const coordinates = []
    //creates a 10 * 10 gameboard represented by a 2d array
    for (let i = 0; i < 100; i++) {
        const coordinate = {
            coordinate: i,
            ship: null
        }
        coordinates.push(coordinate)
    }
    return coordinates
}


const board = new Gameboard() 

board.placeShip(3, 5, "horizontal")

console.log(board)