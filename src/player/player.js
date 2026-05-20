import { Gameboard } from "../gameboard/gameboard.js"

export class Player {
    constructor(boolean, player) {
        this.isAi = boolean
        this.player = player
        this.board = new Gameboard()
    }
}