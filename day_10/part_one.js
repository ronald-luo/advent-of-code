const fs = require("fs");

// pre-process input into trail map

let lines = fs.readFileSync("small.txt", "utf8");
let linesArray = lines.split("\n");

let trailMap = linesArray.map((line) => {
  return line
    .trim()
    .split("")
    .map((val) => Number(val));
});

// find starting points

let trailHeads = new Set();

let rows = trailMap.length;
let cols = trailMap[0].length;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (trailMap[r][c] === 0) {
      trailHeads.add(`${c},${r}`);
    }
  }
}

console.log(trailHeads);

// find number of valid trails

let directions = [
  [0, -1], // up
  [0, 1], // down
  [-1, 0], // left
  [1, 0], // right
];

let dfs = (node, prevVal, visited) => {
  if (node === null || node === undefined) return 0; // check for existence

  let xBound = 0 <= node[0] && node[0] < cols;
  let yBound = 0 <= node[1] && node[1] < rows;

  if (!xBound || !yBound) return 0; // check for boundaries

  // check that next val increments by 1 only
  let curVal = trailMap[node[1]][node[0]];
  if (curVal - prevVal !== 1) return 0;
  prevVal = curVal;

  // count valid end trails that are visited w/o double counting
  if (curVal === 9) {
    visited.add(`${node[0]},${node[1]}`);
    return 1;
  }

  visited.add(`${node[0]},${node[1]}`);

  let total = 0;

  for (let direc of directions) {
    let nextX = node[0] + direc[0];
    let nextY = node[1] + direc[1];

    if (!visited.has(`${nextX},${nextY}`)) {
      let nextNode = [nextX, nextY];
      total += dfs(nextNode, prevVal, visited);
    }
  }

  return total;
};

// iterate through trailHeads

let trailScores = {};

for (let trail of trailHeads) {
  let [x, y] = trail.split(",");
  let score = dfs([Number(x), Number(y)], -1, new Set());

  trailScores[`${x},${y}`] = score;
}

console.log(trailScores);

// compute answer

let sum = Object.values(trailScores).reduce((a, b) => a + b);
console.log(sum);
