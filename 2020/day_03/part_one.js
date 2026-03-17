let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let hill = lines.map((node) => {
  return node.split("");
});
// console.log(hill);

let rows = hill.length;
let cols = hill[0].length;

console.log(rows, cols);

let queue = [[0, 0]];
let treeCount = 0;

while (queue.length > 0) {
  let [currCol, currRow] = queue.shift();

  let colBound = 0 <= currCol && currCol < cols;
  let rowBound = 0 <= currRow && currRow < rows;

  if (!rowBound) break;

  if (hill[currRow][currCol] === "#") treeCount++;
  console.log(hill[currRow][currCol], currCol, currRow);

  let [nextCol, nextRow] = [currCol + 3, currRow + 1];
  if (nextCol >= cols) nextCol = nextCol % cols;
  queue.push([nextCol, nextRow]);
}

console.log(treeCount);
