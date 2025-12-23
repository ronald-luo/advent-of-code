const fs = require("fs");

function solve(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim());

  let currPos = 50;
  let zeroCount = 0;

  for (const line of lines) {
    const direction = line[0];
    const distance = Number(line.slice(1));

    if (direction === "L") {
      // Going left from currPos by distance clicks
      // We hit 0 when we've moved currPos steps (if currPos > 0)
      // Then every 100 steps after that
      if (currPos === 0) {
        // Starting at 0, going left: first click goes to 99, then we hit 0 again after 100 more clicks
        zeroCount += Math.floor(distance / 100);
      } else {
        // Starting at currPos > 0: we hit 0 after currPos clicks, then every 100 after
        // Total hits = floor((distance - currPos) / 100) + 1 if distance >= currPos
        // = 0 if distance < currPos
        if (distance >= currPos) {
          zeroCount += 1 + Math.floor((distance - currPos) / 100);
        }
      }
      currPos = (((currPos - distance) % 100) + 100) % 100;
    } else {
      // Going right from currPos by distance clicks
      // We hit 0 when we wrap from 99 to 0
      // That happens after (100 - currPos) clicks, then every 100 after
      if (currPos === 0) {
        // Starting at 0, going right: first click goes to 1, we hit 0 after 100 clicks
        zeroCount += Math.floor(distance / 100);
      } else {
        // Starting at currPos > 0: we hit 0 after (100 - currPos) clicks, then every 100
        const stepsToZero = 100 - currPos;
        if (distance >= stepsToZero) {
          zeroCount += 1 + Math.floor((distance - stepsToZero) / 100);
        }
      }
      currPos = (currPos + distance) % 100;
    }
  }

  return zeroCount;
}

// Run with puzzle input
const puzzleInput = fs.readFileSync("large.txt", "utf-8");
console.log("Puzzle answer:", solve(puzzleInput));
