const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");

let linesArray = lines.split("\n");

linesArray = linesArray.map((line) => {
  line = line.trim();
  return line.split(" ");
});

function problemDampener(arr) {
  let arrCopies = []; // create 5 copies of the original line with one element removed
  for (let i = 0; i < arr.length; i++) {
    let copy = arr.slice();
    copy.splice(i, 1);
    arrCopies.push(copy);
  }

  for (let line of arrCopies) {
    // check each copy for safety
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
    if (safe) {
      return true; // return true if any of the copies are safe
    }
  }

  return false; // return false if none of the copies are safe
}

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

  if (!safe) {
    safe = problemDampener(line); // check if the line can be made safe before adding up the count
  }

  safe ? safeCount++ : null;
}

console.log(safeCount);
