const fs = require("fs");

// pre-process input into map

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

// console.log(linesArray);

let maze = linesArray.map((node) => node.trim().split(""));

// djiskstras algorithm

let rows = maze.length;
let cols = maze[0].length;

let coordCostDict = {};

let [startCol, startRow] = [0, 0];
let [endCol, endRow] = [0, 0];

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (maze[r][c] === "E") {
      endCol = c;
      endRow = r;
    } else if (maze[r][c] === "S") {
      startCol = c;
      startRow = r;
    }

    // coordCostDict[`${c},${r}`] = Infinity;
    coordCostDict[`${c},${r},1,0`] = Infinity;
    coordCostDict[`${c},${r},0,-1`] = Infinity;
    coordCostDict[`${c},${r},-1,0`] = Infinity;
    coordCostDict[`${c},${r},0,1`] = Infinity;
  }
}

// console.log(coordCostDict);

// the starting point is accessible, so its cost is init to 0
// while there are unvisited neighbours and they are valid go-to positions
// the cost to get to any square is the minimum between current + 1 and whats in the costDict

coordCostDict[`${startCol},${startRow},1,0`] = 0;

let direcNeighbors = {
  "1,0": [
    [0, -1],
    [0, 1],
  ],
  "0,-1": [
    [-1, 0],
    [1, 0],
  ],
  "-1,0": [
    [0, -1],
    [0, 1],
  ],
  "0,1": [
    [1, 0],
    [-1, 0],
  ],
};

let queue = [[startCol, startRow, [1, 0]]];

while (queue.length > 0) {
  let [currCol, currRow, currDirection] = queue.shift();

  let currKey = `${currCol},${currRow},${currDirection[0]},${currDirection[1]}`;
  let currCost = coordCostDict[currKey];
  if (currCost === Infinity) continue; // stale pop

  let cheapNeighbors = [currDirection];
  let costlyNeighbors =
    direcNeighbors[`${currDirection[0]},${currDirection[1]}`];

  let neighbors = [...cheapNeighbors, ...costlyNeighbors];

  for (let direc of neighbors) {
    let [nextCol, nextRow] = [currCol + direc[0], currRow + direc[1]];

    let rowBound = 0 <= nextRow && nextRow < rows;
    let colBound = 0 <= nextCol && nextCol < cols;

    if (rowBound && colBound) {
      let nextChar = maze[nextRow][nextCol];
      if (nextChar === "#") continue; // wall

      let isCheapNeighbor =
        `${currDirection[0]},${currDirection[1]}` === `${direc[0]},${direc[1]}`;

      let edgeCost = isCheapNeighbor ? 1 : 1000 + 1; // move + optional turn
      let nextKey = `${nextCol},${nextRow},${direc[0]},${direc[1]}`;
      let cand = currCost + edgeCost;

      if (cand < coordCostDict[nextKey]) {
        coordCostDict[nextKey] = cand;
        queue.push([nextCol, nextRow, direc]);
      }
    }
  }
}

let bestAtEnd = Infinity;
let endDirs = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];
for (let d of endDirs) {
  let k = `${endCol},${endRow},${d[0]},${d[1]}`;
  if (coordCostDict[k] < bestAtEnd) bestAtEnd = coordCostDict[k];
}
console.log(bestAtEnd);
