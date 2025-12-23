let fs = require('fs');

let data = fs.readFileSync('large.txt', 'utf-8');
let lines = data.split('\n');

let grid = [];
let seen = {};

for (let line of lines) {
    grid.push(line.trim().split('').map((val) => Number(val)));
};

for (let row = 0; row < grid.length; row++) {
    let high = -1;
    for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] > high) {
            high = grid[row][col]
            seen[`${row}, ${col}`] = 1;
        }
    };
};

for (let row = grid.length - 1; row >= 0; row--) {
    let high = -1;
    for (let col = grid[0].length - 1; col >= 0; col--) {
        if (grid[row][col] > high) {
            high = grid[row][col];
            seen[`${row}, ${col}`] = 1;
        }
    };
};

for (let row = 0; row < grid.length; row++) {
    let high = -1;
    for (let col = 0; col < grid[0].length; col++) {
        if (grid[col][row] > high) {
            high = grid[col][row]
            seen[`${col}, ${row}`] = 1;
        }
    };
};

for (let row = grid.length - 1; row >= 0; row--) {
    let high = -1;
    for (let col = grid[0].length - 1; col >= 0; col--) {
        if (grid[col][row] > high) {
            high = grid[col][row];
            seen[`${col}, ${row}`] = 1;
        }
    };
};

function retrieveScore(row, col) {
    let height = grid[row][col];
    let distUp = 0;
    let distDown = 0;
    let distLeft = 0;
    let distRight = 0;

    // Calculate distUp
    for (let i = row - 1; i >= 0; i--) {
        distUp++;
        if (grid[i][col] >= height) {
            break;
        }
    }

    // Calculate distDown
    for (let i = row + 1; i < grid.length; i++) {
        distDown++;
        if (grid[i][col] >= height) {
            break;
        }
    }

    // Calculate distLeft
    for (let j = col - 1; j >= 0; j--) {
        distLeft++;
        if (grid[row][j] >= height) {
            break;
        }
    }

    // Calculate distRight
    for (let j = col + 1; j < grid[0].length; j++) {
        distRight++;
        if (grid[row][j] >= height) {
            break;
        }
    }

    return distUp * distDown * distLeft * distRight;
}



function main () {
    let scores = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            let score = retrieveScore(row, col);  
            scores.push(score);
        };
    };
    console.log(scores)
    console.log(Math.max(...scores));
}


main();