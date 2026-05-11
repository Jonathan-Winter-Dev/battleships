import { Gameboard } from "./gameboard.js";
const BOARDARR = [
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ],
  [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ]
]

test("gameboard is defined", () => {
  expect(Gameboard).toBeDefined();
});

test("gameboard.board is a 10*10 2D array", () => {
    const board = new Gameboard()
  expect(board.board).toStrictEqual(BOARDARR);
});
