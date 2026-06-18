let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Sum up fuel from mass based on rules
// Time: O(N), Space: O(1), Output: Integer (sum of fuel)
// Preconditions: All mass values are integers

// 1. Convert values to numbers
lines = lines.split("\n").map((line) => line.trim());
lines = lines.map(Number);

// 2. Count up fuel
let answer = 0;

for (let val of lines) {
  let fuel = Math.floor(val / 3) - 2;
  answer += fuel;
  console.log(fuel);
}

console.log("answer is", answer);
