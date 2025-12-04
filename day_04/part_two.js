let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) => node.trim().split(""));
console.table(lines);

let rows = lines.length;
let cols = lines[0].length;

let directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

let answer = 0;

let helper = () => {
  let rolls = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let [currCol, currRow] = [c, r];

      let count = 0;

      if (lines[currRow][currCol] === ".") continue;

      for (let [dCol, dRow] of directions) {
        let [nextCol, nextRow] = [currCol + dCol, currRow + dRow];

        let rowBound = 0 <= nextRow && nextRow < rows;
        let colBound = 0 <= nextCol && nextCol < cols;

        if (!rowBound || !colBound) continue;
        if (lines[nextRow][nextCol] === "@") count++;
      }

      if (count < 4) {
        rolls.add(`${currCol},${currRow}`);
      }
    }
  }

  let queue = new Array(...rolls).map((node) =>
    node.split(",").map((node) => Number(node))
  );

  for (let [col, row] of queue) {
    lines[row][col] = ".";
  }

  answer += rolls.size;
  return rolls.size;
};

let prevRolls = Infinity;
while (prevRolls !== 0) {
  prevRolls = helper();
}
console.log("answer is", answer);
