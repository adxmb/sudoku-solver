board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function readBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // ID of input cell is ij, read the input value and update the board
      let cell = document.getElementById(i + "" + j);
      if (cell.value === "") {
        board[i][j] = 0;
        cell.style.backgroundColor = "#c5eded";
      } else {
        board[i][j] = parseInt(cell.value);
        cell.style.backgroundColor = "#fefcbf";
      }
      cell.setAttribute("disabled", "true");
    }
  }
}

function setBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // ID of input cell is ij, update the input value with the board value
      document.getElementById(i + "" + j).value = board[i][j];
    }
  }
}

function isLegal(row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }
  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isLegal(i, j, num)) {
            board[i][j] = num;
            if (solveSudoku()) {
              return true;
            } else {
              board[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

const solve = document.getElementById("solve");
solve.addEventListener("click", () => {
  readBoard();
  solveSudoku();
  setBoard();
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.getElementById(i + "" + j);
      cell.removeAttribute("disabled");
      cell.style.backgroundColor = "#ffffff";
      cell.value = "";
    }
  }
});
