export class Ship {
    constructor(length) {
        this.length = length
        this.health = length
    }
    hit() {
        //checks the ship has not already taken more than the maximum amount of hits
        if (this.health === 0) {
            return this.health
        } else {
            this.health --
            return this.health
        }
    }
    isSunk() {
        if (this.health === 0) {
            return true
        } else {
            return false
        }
    }
}