const fs = require("fs");

// pre-process input into matrix and wall set

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

let corrupted = linesArray.map((node) => {
  let [colWall, rowWall] = node
    .trim()
    .split(",")
    .map((str) => Number(str));

  return [colWall, rowWall];
});

console.log(corrupted);

// check for first 1024 entries and set up walls

corrupted = corrupted.slice(0, 1024);

let walls = new Set();

for (let wall of corrupted) {
  let [colWall, rowWall] = wall;
  walls.add(`${colWall},${rowWall}`);
}

console.log(walls);

// set up costs dict

let costs = {};
let rows = 71;
let cols = 71;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    costs[`${c},${r}`] = Infinity;
  }
}

costs["0,0"] = 0;

// djikstras algorithm

let queue = [[0, 0]];
let directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

while (queue.length > 0) {
  let [currCol, currRow] = queue.shift();

  for (let direc of directions) {
    let [direcCol, direcRow] = direc;
    let [nextCol, nextRow] = [currCol + direcCol, currRow + direcRow];

    let rowBound = 0 <= nextRow && nextRow < rows;
    let colBound = 0 <= nextCol && nextCol < cols;

    if (rowBound && colBound) {
      if (!walls.has(`${nextCol},${nextRow}`)) {
        let nextCost = costs[`${nextCol},${nextRow}`];
        let betterCost = costs[`${currCol},${currRow}`] + 1;

        // only add it to the queue if its better
        if (costs[`${currCol},${currRow}`] + 1 < nextCost) {
          costs[`${nextCol},${nextRow}`] = Math.min(nextCost, betterCost);
          queue.push([nextCol, nextRow]);
        }
      }
    }
  }
}

console.log(costs);
