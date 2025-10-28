const fs = require("fs");

// pre-process input into maze

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

// console.log(linesArray);

let maze = linesArray.map((node) => {
  return node.trim().split("");
});

let rows = maze.length;
let cols = maze[0].length;

// console.log(maze);

// set up djikstras shortest path benchmark

let djikstras = (hole) => {
  // set up djikstras cost dict
  let start = [0, 0];
  let end = [0, 0];

  let costs = {};

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === "S") {
        start[0] = c;
        start[1] = r;
      } else if (maze[r][c] === "E") {
        end[0] = c;
        end[1] = r;
      }

      costs[`${c},${r}`] = Infinity;
    }
  }

  costs[`${start[0]},${start[1]}`] = 0;

  let directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let queue = [start];

  while (queue.length > 0) {
    let [currCol, currRow] = queue.shift();
    let currStr = maze[currRow][currCol];

    for (let [direcCol, direcRow] of directions) {
      let [nextCol, nextRow] = [currCol + direcCol, currRow + direcRow];
      // console.log([nextCol, nextRow]);

      let rowBoundary = 0 <= nextRow && nextRow < rows;
      let colBoundary = 0 <= nextCol && nextCol < cols;
      if (!rowBoundary || !colBoundary) continue;

      let nextStr = maze[nextRow][nextCol];
      let [holeCol, holeRow] = hole;
      if (nextStr === "#" && holeCol === nextCol && holeRow === nextRow)
        nextStr = ".";

      if (nextStr === "#") continue;

      if (costs[`${currCol},${currRow}`] + 1 < costs[`${nextCol},${nextRow}`]) {
        costs[`${nextCol},${nextRow}`] = costs[`${currCol},${currRow}`] + 1;
        queue.push([nextCol, nextRow]);
      }
    }
  }

  return costs[`${end[0]},${end[1]}`];
};

let benchmark = djikstras([65, 75]); // [65,75] for benchmark
console.log(benchmark);
let freq = {};

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let time = djikstras([c, r]);
    if (benchmark - time in freq) {
      freq[benchmark - time] += 1;
    } else {
      freq[benchmark - time] = 1;
    }
  }
}

// compute answer

let sum = 0;
let temp = Object.keys(freq);

for (let saved of temp) {
  if (Number(saved) >= 100) {
    sum += freq[saved];
  }
}

console.log(sum);
