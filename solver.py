SIZE = 9

def is_legal(board, row, col, num):
    # check row
    for x in range(SIZE):
        if board[row][x] == num:
            return False
    # check column
    for x in range(SIZE):
        if board[x][col] == num:
            return False
    # check box
    start_row = row - row % 3
    start_col = col - col % 3
    for i in range(3):
        for j in range(3):
            if board[i + start_row][j + start_col] == num:
                return False
    # Only true if row, column, and box are all legal
    return True

def solve(board, row, col):
    # If we are at the end of the board, we are done
    if (row == SIZE - 1 and col == SIZE):
        return True
    
    # If we are at the end of the row, move to the next row
    if col == SIZE:
        row += 1
        col = 0

    # If the current cell is not empty, move to the next cell
    if board[row][col] > 0:
        return solve(board, row, col + 1)
    
    # Try all numbers from 1 to 9
    for num in range(1, SIZE + 1, 1):
        if is_legal(board, row, col, num):
            board[row][col] = num
            if solve(board, row, col + 1):
                return True
        board[row][col] = 0

    return False

# Needs to change to be dynamic
board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

if solve(board, 0, 0):
    for i in range(SIZE):
        print(board[i])