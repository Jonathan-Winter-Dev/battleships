import { Ship } from "./../ship/ship.js"

export class Gameboard {
    constructor(){
        this.board = createBoard()
        this.ships = []
    }
    placeShip(length, startPosition, orientation) {
        //if the ship cannot fit in to the attempted position, then return false
        if (validShipPlacement(length, startPosition, orientation, this.board) === false) return false        
        
        const ship = new Ship(length)
        this.ships.push(ship)

        if (orientation === "vertical") {
            this.board = createShipVertically(ship, startPosition, this.board)
        }
        if (orientation === "horizontal") {
            this.board = createShipHorizontally(ship, startPosition, this.board)
        }
    }

    getDataByCoordinate(position) {
        return this.board[position]
    }

    receiveAttack(position) {
        //if the position is already hit, then return false
        if (this.board[position].isHit === true) return false

        //if the position does not have a ship, then hit that position
        if (this.board[position].ship === null) {
            this.board[position].isHit = true
            return this.board[position]
        } else {
            this.board[position].isHit = true
            this.board[position].ship.hit()
            return this.board[position]
        }
    }

    isValidShipPlacement(length, startPosition, orientation) {
        return validShipPlacement(length, startPosition, orientation, this.board)
    }
    
    allShipsSunk() {
        //base case for no ships in this.ships
        if (this.ships.length === 0) return false

        for (let ship of this.ships) {
            if (ship.isSunk() === false) return false
        }
        return true
    }
}

function createShipVertically(ship, startPosition, gameboard) {
    const verticalLength = ship.length * 10
    const endPosition = startPosition + verticalLength

    for (let i = startPosition; i < endPosition; i += 10) {
        gameboard[i].ship = ship
    }
    
    return gameboard
}

function createShipHorizontally(ship, startPosition, gameboard) {
    const endPosition = startPosition + ship.length

    for (let i = startPosition; i < endPosition; i++) {
        gameboard[i].ship = ship
    }

    return gameboard
}

function validShipPlacement(length, startPosition, orientation, gameboard) {
    

    if (orientation === "horizontal") {
        //end position minuses one to account for length being converted to array indexing
        const endPosition = length + startPosition -1

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
        for (let i = startPosition; i <= endPosition; i++) {
            if (gameboard[i].ship != null) return false
        }

        //returns true if it is a valid ship locations
        return true
    } else if (orientation === "vertical") {
        const verticalLength = (length - 1)* 10
        //end position minuses one to account for length being converted to array indexing
        const endPosition = startPosition + verticalLength

        //returns false if out of upper bounds of the board
        if (endPosition > 99) return false

        //checks to ensure that a ship is not being places on top of another ship
        for (let i = startPosition; i <= endPosition; i += 10) {
            if (gameboard[i].ship !== null) return false
        }

        //returns true if all other cases are correct
        return true
    }
}

export function createBoard() {
    const coordinates = []
    //creates a 10 * 10 gameboard represented by a 2d array
    for (let i = 0; i < 100; i++) {
        const coordinate = {
            coordinate: i,
            ship: null,
            isHit: false
        }
        coordinates.push(coordinate)
    }
    return coordinates
}


