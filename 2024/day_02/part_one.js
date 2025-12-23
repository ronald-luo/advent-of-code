const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");

let linesArray = lines.split("\n");

linesArray = linesArray.map((line) => {
  line = line.trim();
  return line.split(" ");
});

let safeCount = 0;

for (let line of linesArray) {
  let safe = true;
  let sign = null;
  for (let i = 1; i < line.length; i++) {
    let diff = line[i] - line[i - 1];

    if (sign === null) {
      sign = diff > 0 ? "+" : "-";
    } else if (sign === "+" && diff < 0) {
      safe = false;
    } else if (sign === "-" && diff > 0) {
      safe = false;
    }

    if (Math.abs(diff) === 0 || Math.abs(diff) > 3) {
      safe = false;
    }
  }
  safe ? safeCount++ : null;
}

console.log(safeCount);
