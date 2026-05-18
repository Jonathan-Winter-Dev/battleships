import { Gameboard } from "./gameboard.js";

const BOARDARR = createBoard()

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


test("gameboard is defined", () => {
  expect(Gameboard).toBeDefined();
});

test("gameboard.board is an array with a length of 100", () => {
    const board = new Gameboard()
  expect(board.board).toStrictEqual(BOARDARR);
});


test("gameboard.placeShip() ", () => {
    const board = new Gameboard()
  expect(board.board).toStrictEqual(BOARDARR);
});




