import { Player } from "./../player/player.js"

export class GameController {
    constructor() {
        this.players = []
    }
    addPlayer(boolean, playerName) {
        // if there is already 2 players then throw error
        if (this.players.length >= 2) throw new Error("Only two players allowed")

        //if there is already 1 player then the player must be player 2, otherwise 
        // the player must be player 1
        if (this.players.length === 1) {
            const newPlayer = new Player(boolean, "player2", playerName)
            this.players.push(newPlayer)
            return newPlayer
        } else {
            const newPlayer = new Player(boolean, "player1", playerName)
            this.players.push(newPlayer)
            return newPlayer
        }
    }
    switchPlayer(currentPlayer) {
        if (this.getPlayers().length !== 2) throw new Error("There must be two players to switch turns")

        return this.getPlayers().find((item) => item.player !== currentPlayer.player)
    }

    getPlayers() {
        return this.players
    }

    checkWinner(currentPlayer) {
        if (this.getPlayers().length !== 2) throw new Error("There must be two players to check for winner")
     
        //check to see if all the others players ships are sunk. Return true if they are, false if they're not
        const otherPlayer =  this.getPlayers().find((item) => item.player !== currentPlayer.player)

        return otherPlayer.board.allShipsSunk()
    }

    makeAiMove(currentPlayer) {
        const otherPlayer = this.switchPlayer(currentPlayer)
        const positionsNotHit = otherPlayer.board.filter((position) => position.isHit === false)
    }
}