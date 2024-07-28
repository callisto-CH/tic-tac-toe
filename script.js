const gameboard = (function () {

	const board = [[], [], []];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			board[i].push(cell());
		}
	};

	const getBoard = () => board;

	const render = () => {
		//DOM VERSION
	};

	// NOT NEEDED FOR DOM VERSION
	const renderConsole = () => {
		str = "";
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const mark = board[i][j].getMark();
				str += mark ? mark : "_";
			}
			str += "\n";
		}
		console.log(str);
	};

	return {
		getBoard, render, renderConsole
	};

})();

function cell() {

	let mark = "";

	const getMark = () => mark;

	const addMark = (player) => {
		mark = player == 1 ? "X" : "O";
	};

	return {
		getMark, addMark
	};

};

const gameState = (function () {

	let currentPlayer = 1;
	let turnCount = 1;
	let gameOver;

	const getCurrentPlayer = () => currentPlayer;

	const changeCurrentPlayer = () => {
		currentPlayer = currentPlayer == 1 ? 2 : 1;
	};

	const getTurnCount = () => turnCount;

	const incrementTurnCount = () => {
		turnCount++;
	};

	const checkWin = function () {
		// Checks for win by testing a string representation of the board with regex
		// XXX = row case, X..X..X = top-right bottom-left diagonal case,
		// X...X...X = column case, X....X....X = top-left bottom-right diagonal case
		const board = gameboard.getBoard();
		let str = "";
		const regex = new RegExp(`(XXX|OOO)|(X..X..X|O..O..O)|(X...X...X|O...O...O)|(X....X....X|O....O....O)`);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const mark = board[i][j].getMark();
				str += mark ? mark : " ";
			}
			str += " ";
		};
		return regex.test(str);
	};

	const playTurn = (row, column) => {
		if (gameOver) {
			console.log("The game is already over");
			return
		};

		const cell = gameboard.getBoard()[row - 1][column - 1];
		if (cell.getMark()) {
			console.log("Move is invalid"); //ALTER FOR DOM VERSION
			return
		};

		cell.addMark(currentPlayer);
		gameboard.renderConsole();

		//it's impossible to win before turn 4 so no need to check
		if (turnCount > 4 && checkWin(gameboard.getBoard)) {
			gameOver = true;
			console.log(`Player ${currentPlayer} wins`);
			return 
		};
 
		if (turnCount == 9) {
			gameOver = true;
			console.log(`The game ends in a tie`);
			return
		};

		changeCurrentPlayer();
		incrementTurnCount();
		console.log(`Player ${currentPlayer}'s turn`);
	};

	const startGame = () => {
		gameboard.renderConsole();
		console.log("Player 1's turn")
	};

	startGame();

	return {
		playTurn, getCurrentPlayer, getTurnCount
	};

})();