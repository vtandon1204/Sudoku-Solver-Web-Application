document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    addArrowKeyNavigation();
});

function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = ''; // Clear the grid before creating
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.id = `cell-${row}-${col}`;
            input.classList.add('user-input');
            td.appendChild(input);
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }
}

function solveSudoku() {
    const grid = getGridValues();
    if (grid) {
        if (solve(grid)) {
            setGridValues(grid);
        } else {
            alert('No solution exists!');
        }
    }
}

function getGridValues() {
    const grid = [];
    for (let row = 0; row < 9; row++) {
        const rowValues = [];
        for (let col = 0; col < 9; col++) {
            const inputElement = document.getElementById(`cell-${row}-${col}`);
            const value = inputElement.value;
            if (value) {
                if (isNaN(value) || value < 1 || value > 9) {
                    inputElement.classList.add('error');
                    alert('Invalid input detected. Please enter numbers between 1 and 9.');
                    return null;
                } else {
                    inputElement.classList.remove('error');
                }
                rowValues.push(parseInt(value));
                inputElement.classList.add('user-input');
            } else {
                rowValues.push(0);
                inputElement.classList.remove('user-input');
            }
        }
        grid.push(rowValues);
    }
    return grid;
}

function setGridValues(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const inputElement = document.getElementById(`cell-${row}-${col}`);
            if (grid[row][col] !== 0) {
                if (inputElement.value) {
                    inputElement.classList.add('user-input'); // User input
                } else {
                    inputElement.value = grid[row][col];
                    inputElement.classList.add('solver-output'); // Solver output
                }
            }
        }
    }
}

function solve(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
        return true; // Puzzle solved
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) {
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false; // Trigger backtracking
}

function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num || grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
            return false;
        }
    }
    return true;
}

function addArrowKeyNavigation() {
    document.addEventListener('keydown', (event) => {
        const activeElement = document.activeElement;
        if (activeElement.tagName.toLowerCase() === 'input') {
            const [row, col] = activeElement.id.split('-').slice(1).map(Number);
            switch (event.key) {
                case 'ArrowUp':
                    moveFocus(row - 1, col);
                    break;
                case 'ArrowDown':
                    moveFocus(row + 1, col);
                    break;
                case 'ArrowLeft':
                    moveFocus(row, col - 1);
                    break;
                case 'ArrowRight':
                    moveFocus(row, col + 1);
                    break;
                case 'Enter':
                    moveFocus(row, col + 1);
                    break;
                case 'Backspace':
                    if (activeElement.value === '') {
                        moveFocus(row, col - 1);
                    }
                    break;
            }
        }
    });
}

function moveFocus(row, col) {
    if (col >= 9) {
        col = 0;
        row++;
    } else if (col < 0) {
        col = 8;
        row--;
    }
    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
        document.getElementById(`cell-${row}-${col}`).focus();
    }
}

function clearGrid() {
    createGrid(); // Regenerate an empty grid
}
