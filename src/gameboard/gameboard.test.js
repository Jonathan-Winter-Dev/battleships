import { Gameboard } from "./gameboard.js"
import { createBoard } from "./gameboard.js"
import { Ship } from "../ship/ship.js";

const BOARDARR = createBoard()

test("gameboard is defined", () => {
  expect(Gameboard).toBeDefined();
});

test("gameboard.board is an array with a length of 100", () => {
    const board = new Gameboard()
  expect(board.board).toStrictEqual(BOARDARR);
});

// ***** TESTS FOR VALID HORIZONTAL PLACEMENTS *****

test("will return false on attempting to place a ship horizontally that would be out of upper bounds", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(6, 98, "horizontal")).toBe(false);
});

test("will return false on attempting to place a ship horizontally that would wrap from first to second line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(6, 8, "horizontal")).toBe(false);
});

test("will return false on attempting to place a ship horizontally that would wrap from second to third line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(6, 18, "horizontal")).toBe(false);
});

test("will return false on attempting to horizontally place a ship on top of another ship", () => {
    const board = new Gameboard()
    const testShip = new Ship(1)
    board.board[5].ship = testShip
    expect(board.isValidShipPlacement(2, 4, "horizontal")).toBe(false);
});

test("will return true when placing a valid ship on the first line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(2, 5, "horizontal")).toBe(true);
});

test("will return true when placing a valid ship on the third line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(8, 20, "horizontal")).toBe(true);
});

test("will return true when placing an exact fitting ship at the end of the board", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(1, 99, "horizontal")).toBe(true);
});

test("will return true when placing an exact fitting ship in the middle of the board", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(3, 37, "horizontal")).toBe(true);
});

// ***** TESTS FOR VALID VERTICAL PLACEMENTS *****

test("will return false on attempting to place a ship vertically that would be out of upper bounds", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(3, 80, "vertical")).toBe(false);
});

test("will return false on attempting to vertically place a ship on top of another ship", () => {
    const board = new Gameboard()
    const testShip = new Ship(1)
    board.board[30].ship = testShip
    expect(board.isValidShipPlacement(3, 20, "vertical")).toBe(false);
});

test("will return true when placing a valid ship vertically on the first line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(2, 5, "vertical")).toBe(true);
});

test("will return true when placing a valid ship vertically on the third line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(2, 30, "vertical")).toBe(true);
});

test("will return true when placing a valid ship vertically on the third line", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(2, 30, "vertical")).toBe(true);
});

test("will return true when placing an exact fitting ship", () => {
    const board = new Gameboard()
    expect(board.isValidShipPlacement(1, 99, "vertical")).toBe(true);
});

// ***** TESTS FOR RECEIVING HITS *****

test("receiveAttack() will update isHit status on a position without a ship", () => {
    const board = new Gameboard()
    board.receiveAttack(3)
    const position = board.getDataByCoordinate(3)
    expect(position.isHit).toBe(true);
});

test("receiveAttack() will update isHit status on a position with a ship", () => {
    const board = new Gameboard()
    board.placeShip(1, 1, "horizontal")
    board.receiveAttack(1)
    const position = board.getDataByCoordinate(1)
    expect(position.isHit).toBe(true);
    expect(position.ship.health).toBe(0);
});

// ***** TESTS FOR RECEIVING HITS *****

test("allShipsSunk() returns false on a gameboard with no ships", () => {
    const board = new Gameboard()
    expect(board.allShipsSunk()).toBe(false);
});

test("allShipsSunk() returns false on a gameboard with ships that have not been sunk", () => {
    const board = new Gameboard()
    board.placeShip(1, 1, "horizontal")
    board.placeShip(2, 10, "vertical")
    expect(board.allShipsSunk()).toBe(false);
});


test("allShipsSunk() returns false on a gameboard with a mix of sunk and not sunk ships", () => {
    const board = new Gameboard()
    board.placeShip(1, 1, "horizontal")
    board.receiveAttack(1)
    board.placeShip(2, 10, "vertical")
    expect(board.allShipsSunk()).toBe(false);
});

test("allShipsSunk() returns true where all ships have been sunk", () => {
    const board = new Gameboard()
    board.placeShip(1, 1, "horizontal")
    board.receiveAttack(1)
    board.placeShip(2, 10, "vertical")
    board.receiveAttack(10)
    board.receiveAttack(20)

    expect(board.allShipsSunk()).toBe(true);
});