import { Gameboard } from "../gameboard/gameboard.js"

export class Player {
    constructor(boolean, player, playerName) {
        this.isAi = boolean
        this.player = player
        this.name = playerName
        this.board = new Gameboard()
    }
}