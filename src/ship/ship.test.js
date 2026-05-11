import { Ship } from "./ship";

test("Ship is defined", () => {
  expect(Ship).toBeDefined();
});

test("Sets the correct length for a ship", () => {
  const ship = new Ship(4);

  expect(ship.length).toBe(4);
});

test("hit() returns updated health for first valid hit", () => {
  const ship = new Ship(4);

  expect(ship.hit()).toBe(3);
});

test("hit() returns true for multiple valid hits", () => {
  const ship = new Ship(4);

  expect(ship.hit()).toBe(3);
  expect(ship.hit()).toBe(2);
  expect(ship.hit()).toBe(1);
});

test("hit() returns 0 when ship is at 0 health", () => {
  const ship = new Ship(1);

  expect(ship.hit()).toBe(0);
});

test("isSunk() returns false on a full health ship", () => {
  const ship = new Ship(1);

  expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns false on a ship that had been hit", () => {
  const ship = new Ship(2);

  ship.hit()

  expect(ship.isSunk()).toBe(false);
});

test("isSunk() returns true on a ship with no health", () => {
  const ship = new Ship(1);

  ship.hit()

  expect(ship.isSunk()).toBe(true);
});