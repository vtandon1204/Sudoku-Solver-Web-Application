# 1. Pick empty boxes
# 2. try all the numbers
# 3. find one that works
# 4. repeat 
# 5. backtrack


board = [
    [0,0,0,4,5,8,6,2,9],
    [0,0,0,6,0,0,0,0,0],
    [6,0,9,2,0,0,0,0,0],
    [0,0,0,8,4,0,7,0,1],
    [5,7,0,0,0,0,8,4,0],
    [0,4,0,0,2,7,0,0,0],
    [0,9,0,7,0,4,0,3,6],
    [2,0,0,0,6,0,4,0,5],
    [0,6,0,0,0,0,1,0,0]
]

def find_empty(board):
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j]==0:
                return (i,j) # (row,col)
    return None

def solve(board):
    find = find_empty(board)
    # base case
    if not find:
        return True
    else:
        row, col = find
    
    for i in range(1,10):
        if valid(board, i, (row,col)):
            board[row][col] = i
            if solve(board):
                return True
        
            board[row][col]=0
        
    return False    
    
        
        
def valid(board, num, pos):
    # num = number to be inserted
    # pos = position(row) where the number is to be inserted
    # check row: iterate through each column of row and check if there is a number similar to that of to be inserted
    for i in range(len(board[0])):
        if board[pos[0]][i] == num and pos[1] != i:
            return False
    
    # check column
    for i in range(len(board)):
        if board[i][pos[1]] == num and pos[0] != i:
            return False

    # check box
    box_x = pos[1] // 3 
    box_y = pos[0] // 3
    
    
    for i in range(box_y*3, box_y*3 + 3):
        for j in range(box_x*3, box_x*3+3):
            if board[i][j]== num and (i,j) !=pos:
                return False
            
    return True
            
            
def print_board(board):
    for i in range(len(board)):
        if i % 3==0 and i!=0:
            print("----------------------") 
            # it will print a horizontal line after evry 3 rows in the board
        for j in range(len(board[0])):
            if j%3 ==0 and j!=0:
                print("| ", end="") 
            # it will print a vertical line after every 3 columns of board
            # end="" means to stay in the same line after printing the data
            if j==8:
                print(board[i][j]) 
                # at the last column, it will the elements of the board without leaving a space after it 
            else:
                print(str(board[i][j])+ " ", end="") 
                # it will the elements of the board and leaving a space after it from the next element to print


# find_empty(board)

print("initial state")
print_board(board)
solve(board)
print("\nafter solving the sudoku looks like: ")
print_board(board)
