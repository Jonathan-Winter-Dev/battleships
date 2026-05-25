import { GameController } from "./game-controller.js"

test("GameController is defined", () => {
  expect(GameController).toBeDefined();
});

test("addPlayer() adds one player", () => {
    const gameController = new GameController()
    gameController.addPlayer(false, "testName")
    expect(gameController.players.length).toBe(1);
});


test("addPlayer() adds two players", () => {
    const gameController = new GameController()
    gameController.addPlayer(false, "testName")
    gameController.addPlayer(false, "testName2")
    expect(gameController.players.length).toBe(2);
});

test("addPlayer() returns first player with player.player string of player1", () => {
    const gameController = new GameController()
    const player1 = gameController.addPlayer(true, "player1")
    expect(player1.player).toBe("player1");
});

test("addPlayer() returns first player with player.player string of player1", () => {
    const gameController = new GameController()
    const player1 = gameController.addPlayer(true, "player1")
    const player2 = gameController.addPlayer(true, "player2")
    expect(player2.player).toBe("player2");
});

test("addPlayer() throws error when trying to add more than two players", () => {
    const gameController = new GameController()
    gameController.addPlayer(false, "testName")
    gameController.addPlayer(false, "testName2")
    expect(() => {
        gameController.addPlayer(false, "thisShouldThrow")
    }).toThrow();
});


test("switchPlayer() throws error when trying to switch turns when there are not 2 players", () => {
    const gameController = new GameController()
    const player = gameController.addPlayer(false, "testName")
    expect(() => {
        gameController.switchPlayer(player.player)
    }).toThrow();
});

test("switchPlayer() returns the player that was not passed to switchPlayer()", () => {
    const gameController = new GameController()
    const player1 = gameController.addPlayer(true, "player1")
    const player2 = gameController.addPlayer(true, "player2")

    const currentPlayer = gameController.switchPlayer(player1)
    expect(currentPlayer.player).toBe("player2");
    
    const newCurrentPlayer = gameController.switchPlayer(currentPlayer)
    expect(newCurrentPlayer.player).toBe("player1")
});

test("checkWinner() returns false if a player has not sunk the other players ships", () => {
    const gameController = new GameController()
    const player1 = gameController.addPlayer(true, "player1")
    const player2 = gameController.addPlayer(true, "player2")

    player2.board.placeShip(1, 1, "horizontal")

    expect(gameController.checkWinner(player1)).toBe(false)
});

test("checkWinner() returns true if a player has sunk the other players ships", () => {
    const gameController = new GameController()
    const player1 = gameController.addPlayer(true, "player1")
    const player2 = gameController.addPlayer(true, "player2")

    player2.board.placeShip(1, 1, "horizontal")
    player2.board.receiveAttack(1)

    expect(gameController.checkWinner(player1)).toBe(true)
});