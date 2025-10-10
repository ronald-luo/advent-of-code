const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");
let linesArray = lines.split("\n");

linesArray = linesArray.map((line) => {
  return line.trim();
});

let x = linesArray[0].length;
let y = linesArray.length;

let barrierDict = {};
let start = [];

for (let i = 0; i < y; i++) {
  for (let j = 0; j < x; j++) {
    if (linesArray[i][j] === "#") {
      barrierDict[`${i},${j}`] = 1; // saved as x, y
    }
    if (linesArray[i][j] === "^") {
      start[0] = j;
      start[1] = i;
    }
  }
}

let directions = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
];

let visited = {};
let counter = 0;

let dfs = (node, direc) => {
  // boundary checker
  let xBound = 0 <= node[0] && node[0] < x;
  let yBound = 0 <= node[1] && node[1] < y;

  if (!node) return;
  if (!xBound || !yBound) return;

  visited[`${node[0]},${node[1]}`] = 1;

  let nextX = node[0] + direc[0];
  let nextY = node[1] + direc[1];

  let nextBoundX = 0 <= nextX && nextX < x;
  let nextBoundY = 0 <= nextY && nextY < y;

  if (!nextBoundX || !nextBoundY) return;

  let nextChar = linesArray[nextY][nextX];

  if (nextChar && nextChar === "#") {
    counter += 1;
    let newDirec = directions[counter % directions.length];
    nextX = node[0] + newDirec[0];
    nextY = node[1] + newDirec[1];

    dfs([nextX, nextY], newDirec);
  } else {
    dfs([nextX, nextY], direc);
  }
};

dfs(start, directions[counter]);

console.log(Object.keys(visited).length);
