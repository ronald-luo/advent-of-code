const fs = require("fs");
const { createSecureContext } = require("tls");

let lines = fs.readFileSync("short.txt", "utf8");
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
let visitedArr = [];
let counter = 0;

let turnDict = {};
let turnArray = [];

let dfs = (node, direc) => {
  // boundary checker
  let xBound = 0 <= node[0] && node[0] < x;
  let yBound = 0 <= node[1] && node[1] < y;

  if (!node) return;
  if (!xBound || !yBound) return;

  visited[`${node[0]},${node[1]}`] = 1;
  visitedArr.push([node[0], node[1]]);

  let nextX = node[0] + direc[0];
  let nextY = node[1] + direc[1];

  let nextBoundX = 0 <= nextX && nextX < x;
  let nextBoundY = 0 <= nextY && nextY < y;

  if (!nextBoundX || !nextBoundY) return;

  let nextChar = linesArray[nextY][nextX];

  if (nextChar && nextChar === "#") {
    counter += 1;
    // console.log(direc);
    // console.log(nextX, nextY);

    turnDict[`${nextX + direc[0] * -1},${nextY + direc[1] * -1}`] = direc;
    turnArray.push(`${nextX + direc[0] * -1},${nextY + direc[1] * -1}`);

    let newDirec = directions[counter % directions.length];
    nextX = node[0] + newDirec[0];
    nextY = node[1] + newDirec[1];

    dfs([nextX, nextY], newDirec);
  } else {
    dfs([nextX, nextY], direc);
  }
};

dfs(start, directions[counter]);

console.log(turnDict);

for (let i = 1; i < visitedArr.length; i++) {
  let curr = visitedArr[i];
  let prev = visitedArr[i - 1];

  let direc = [curr[0] - prev[0], curr[1] - prev[1]];
  console.log(curr, direc);
}

// turnArray.unshift(`${start[0]},${start[1]}`);

// intialize an answer counter
// turnArray contains an ordered list of vertices where a turn is made
// for each index along its path
//   to the right of it, if there is a vertex in its path that forms a square, then increase counter by 1
// return counter

// look at a window of two at a time
//

// for (turn of turnArray) {

//   console.log(turn);
//   console.log(directions[counter % directions.length]);
//   counter++;
//   console.log("");
// }

// two things must be true
// 1. new obstacles must originate out of the guards original path
// 2. check if rect algorithm checks all boundaries for rect match
//   (i.e just because a block was used in one way before doesn't mean that it will be used the same way)

// for (let i = 1; i < turnArray.length; i++) {
//   console.log(turnArray[i - 1], turnArray[i]);
//   let curr = turnArray[i].split(",");
//   let last = turnArray[i - 1].split(",");

//   let x1 = last[0];
//   let y1 = last[1];
//   let x2 = curr[0];
//   let y2 = curr[1];

//   console.log(x2 - x1, y2 - y1);
// }
