const gameboard = (function () {

	const board = [[], [], []];
	const grid = document.querySelector(`.grid`);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			board[i].push(cell());

			const cellDiv = document.createElement(`div`);
			cellDiv.classList.add(`cell`);
			cellDiv.setAttribute(`id`, `${i}${j}`);

			cellDiv.addEventListener(`click`, clickHandler);
			function clickHandler (event) {
				gameState.playTurn(event.target);
			};

			grid.appendChild(cellDiv);
		};
	};

	const getBoard = () => board;

	return {
		getBoard
	};

})();

function cell() {

	let mark = "";

	const getMark = () => mark;

	const addMark = (cellDiv, player) => {
		if (mark) {
			return
		};
		mark = player == 1 ? "X" : "O";
		renderMark(cellDiv);
	};

	const renderMark = (cellDiv) => {
		cellDiv.textContent = mark;
	};

	return {
		getMark, addMark
	};

};

const gameState = (function () {

	const status = document.querySelector(`.status`);
	const board = gameboard.getBoard();
	let currentPlayer = 1;
	let turnCount = 1;
	let gameOver;

	const changeCurrentPlayer = () => {
		currentPlayer = currentPlayer == 1 ? 2 : 1;
	};

	const incrementTurnCount = () => {
		turnCount++;
	};

	const checkWin = function (board) {
		// Checks for win by testing a string representation of the board with regex
		let str = "";
		const regex = new RegExp(`(XXX|OOO)|(X..X..X|O..O..O)|(X...X...X|O...O...O)|(X....X....X|O....O....O)`);
		// XXX = row case, X..X..X = top-right bottom-left diagonal case,
		// X...X...X = column case, X....X....X = top-left bottom-right diagonal case
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const mark = board[i][j].getMark();
				str += mark ? mark : " ";
			}
			str += " ";
		};
		return regex.test(str);
	};

	const playTurn = (cellDiv) => {
		if (gameOver) {
			return
		};

		const row = cellDiv.id[0];
		const column = cellDiv.id[1];
		const cell = board[row][column];
		cell.addMark(cellDiv, currentPlayer);

		//it's impossible to win before turn 4 so no need to check
		if (turnCount > 4 && checkWin(board)) {
			gameOver = true;
			status.textContent = `Player ${currentPlayer} wins`;
			return
		};
 
		if (turnCount == 9) {
			gameOver = true;
			status.textContent = `The game ends in a tie`;
			return
		};

		changeCurrentPlayer();
		incrementTurnCount();
		status.textContent = `Player ${currentPlayer}'s turn`;
	};

	return {
		playTurn
	};

})();