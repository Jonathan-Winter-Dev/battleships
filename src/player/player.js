import { Gameboard } from "../gameboard/gameboard.js"

export class Player {
    constructor(boolean) {
        this.isAi = boolean
        this.board = new Gameboard()
    }
}