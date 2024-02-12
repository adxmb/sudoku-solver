let SIZE = 9;

let board = [
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

// Reads the input board and updates the board array
function readBoard() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
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
  return true;
}

// Updates the input cells with the board values
function setBoard() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      // ID of input cell is ij, update the input value with the board value
      document.getElementById(i + "" + j).value = board[i][j];
    }
  }
}

// Clears the board and enables all cells
function clearBoard() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      let cell = document.getElementById(i + "" + j);
      cell.removeAttribute("disabled");
      cell.style.backgroundColor = "#ffffff";
      cell.value = "";
    }
  }
}

// Checks if a number is already in the row, column or 3x3 box
function isLegal(row, col, num) {
  return checkRow(row, num) && checkCol(col, num) && checkBox(row, col, num);
}

// Helper function for isLegal
function checkRow(row, num) {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }
  return true;
}

// Helper function for isLegal
function checkCol(col, num) {
  for (let i = 0; i < SIZE; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }
  return true;
}

// Helper function for isLegal
function checkBox(row, col, num) {
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
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] === 0) {
        for (let num = 1; num <= SIZE; num++) {
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
  if (!readBoard() || !solveSudoku()) {
    clearBoard();
    alert("Invalid sudoku board");
  } else {
    setBoard();
  }
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  clearBoard();
});
