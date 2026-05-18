import {validShipPlacement, Gameboard} from "./gameboard.js"
import { Ship } from "../ship/ship.js";


test("validShipPlacement() is defined", () => {
    expect(validShipPlacement).toBeDefined();
});

// ***** TESTS FOR HORIZONTAL PLACEMENTS *****

test("will return false on attempting to place a ship horizontally that would be out of upper bounds", () => {
    const board = new Gameboard()
    expect(validShipPlacement(6, 98, "horizontal", board.board)).toBe(false);
});

test("will return false on attempting to place a ship horizontally that would wrap from first to second line", () => {
    const board = new Gameboard()
    expect(validShipPlacement(6, 8, "horizontal", board.board)).toBe(false);
});

test("will return false on attempting to place a ship horizontally that would wrap from second to third line", () => {
    const board = new Gameboard()
    expect(validShipPlacement(6, 18, "horizontal", board.board)).toBe(false);
});

test("will return false on attempting to horizontally place a ship on top of another ship", () => {
    const board = new Gameboard()
    const testShip = new Ship(1)
    board.board[5].ship = testShip
    expect(validShipPlacement(2, 4, "horizontal", board.board)).toBe(false);
});

test("will return true when placing a valid ship on the first line", () => {
    const board = new Gameboard()
    expect(validShipPlacement(2, 5, "horizontal", board.board)).toBe(true);
});

test("will return true when placing a valid ship on the third line", () => {
    const board = new Gameboard()
    expect(validShipPlacement(8, 20, "horizontal", board.board)).toBe(true);
});

// ***** TESTS FOR VERTICAL PLACEMENTS *****

test("will return false on attempting to place a ship vertically that would be out of upper bounds", () => {
    const board = new Gameboard()
    expect(validShipPlacement(3, 80, "vertical", board.board)).toBe(false);
});

test("will return false on attempting to vertically place a ship on top of another ship", () => {
    const board = new Gameboard()
    const testShip = new Ship(1)
    board.board[30].ship = testShip
    expect(validShipPlacement(3, 20, "vertical", board.board)).toBe(false);
});

test("will return true when placing a valid ship vertically on the first line", () => {
    const board = new Gameboard()
    expect(validShipPlacement(2, 5, "vertical", board.board)).toBe(true);
});

test("will return true when placing a valid ship vertically on the third line", () => {
    const board = new Gameboard()
    expect(validShipPlacement(2, 30, "vertical", board.board)).toBe(true);
});