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

let count = 0;
for (let item of Object.keys(seen)) {
    count += 1;
}

console.log(count)