let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) => node.trim());

console.table(lines);

let rows = lines.length;
let cols = lines[0].length;

let splitters = new Set();
let [startCol, startRow] = [null, null];

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let curr = lines[r][c];

    if (curr === "S") [startCol, startRow] = [c, r];
    if (curr === "^") splitters.add(`${c},${r}`);
  }
}

console.log("start is", [startCol, startRow]);
console.log(splitters);

let queue = [[startCol, startRow]];
let visited = new Set();

let activationCount = 0;

while (queue.length > 0) {
  let [currCol, currRow] = queue.shift();

  let directions = [[0, 1]]; // the beams themselves only go down

  for (let [direcCol, direcRow] of directions) {
    let [nextCol, nextRow] = [currCol + direcCol, currRow + direcRow];

    let colBound = 0 <= nextCol && nextCol < cols;
    let rowBound = 0 <= nextRow && nextRow < rows;

    if (visited.has(`${nextCol},${nextRow}`)) continue;
    if (!colBound || !rowBound) continue;

    let nextChar = lines[nextRow][nextCol];
    // a beam will spawn 2 more on either side when encountering a splitter.
    // then we can move diagnoally left and diagonally right from the current cell.
    if (nextChar === "^") {
      activationCount++;

      let splitterDirections = [
        [-1, 1],
        [1, 1],
      ];

      for (let [sdCol, sdRow] of splitterDirections) {
        [nextCol, nextRow] = [currCol + sdCol, currRow + sdRow];

        colBound = 0 <= nextCol && nextCol < cols;
        rowBound = 0 <= nextRow && nextRow < rows;

        if (visited.has(`${nextCol},${nextRow}`)) continue;
        if (!colBound || !rowBound) continue;

        visited.add(`${nextCol},${nextRow}`);
        queue.push([nextCol, nextRow]);
      }
    } else if (nextChar === ".") {
      visited.add(`${nextCol},${nextRow}`);
      queue.push([nextCol, nextRow]); // else we just continue moving down
    }
  }
}

console.log("answer is", activationCount);
