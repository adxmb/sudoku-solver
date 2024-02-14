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
        cell.style.backgroundColor = "#ffffff";
      } else if (
        checkInput(cell.value) &&
        isLegal(i, j, parseInt(cell.value))
      ) {
        board[i][j] = parseInt(cell.value);
        cell.style.backgroundColor = "#2b3355";
        cell.style.color = "#ffffff";
      } else {
        return false;
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
      cell.style.color = "#2b3355";
      board[i][j] = 0;
      cell.value = "";
    }
  }
}

// Checks if the input is a number between 1 and 9
function checkInput(input) {
  return !(isNaN(input) || input < 1 || input > 9);
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

function solveSudoku(row, col) {
  // If the last cell is reached, the board is solved
  if (row === SIZE - 1 && col === SIZE) {
    return true;
  }

  // If the last column is reached, move to the next row
  if (col === SIZE) {
    row++;
    col = 0;
  }

  // If the cell is already filled, move to the next cell
  if (board[row][col] > 0) {
    return solveSudoku(row, col + 1);
  }

  // Try all numbers from 1 to 9
  for (let num = 1; num <= SIZE; num++) {
    if (isLegal(row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(row, col + 1)) {
        return true;
      }
    }
    board[row][col] = 0;
  }

  return false;
}

const solve = document.getElementById("solve");
solve.addEventListener("click", () => {
  if (!readBoard() || !solveSudoku(0, 0)) {
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
