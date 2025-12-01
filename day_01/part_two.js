let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let currVal = 50;
let currRot = 0;

let zeroCount = 0;

for (let i = 0; i < lines.length; i++) {
  let temp = lines[i];

  currRot =
    temp[0] === "R"
      ? Number(temp.split("R")[1])
      : Number(temp.split("L")[1]) * -1;

  console.log("currRot", currRot);
  console.log("currVal", currVal);

  // Calculate how many times we pass through 0
  let start = currVal;
  let distance = Math.abs(currRot);

  if (currRot > 0) {
    // Going right
    let timesThrough0 = Math.floor((start + currRot) / 100);
    zeroCount += timesThrough0;
    console.log("  going right, times through 0:", timesThrough0);
  } else {
    // Going left
    let timesThrough0 =
      Math.floor((start - distance) / 100) - Math.floor(start / 100);
    timesThrough0 = Math.abs(timesThrough0);
    zeroCount += timesThrough0;
    console.log("  going left, times through 0:", timesThrough0);
  }

  // Update position
  currVal = (((currVal + currRot) % 100) + 100) % 100;

  console.log("  new position:", currVal);
  console.log("  total zeroCount:", zeroCount);
  console.log("");
}

console.log("zeroCount", zeroCount);
console.log("currVal", currVal);
