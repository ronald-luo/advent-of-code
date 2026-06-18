let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Adding up fuel which requires more fuel
// Time: O(N**2) Space: O(N), Output: Integer (sum of  fuel)
// Preconditions: Each fuel is an integer greater than zero

// 1. Convert values to numbers
lines = lines.split("\n").map((line) => line.trim());
lines = lines.map(Number);

// 2. Count up fuel
let answer = 0;

for (let val of lines) {
  let fuel = Math.floor(val / 3) - 2;
  // console.log("starting fuel", fuel);

  answer += fuel;
  // console.log("adding", fuel);
  let curr = fuel;

  while (curr >= 0) {
    curr = Math.floor(curr / 3) - 2;
    if (curr <= 0) break;
    // console.log("adding", curr);
    answer += curr;
  }
}

console.log("answer is", answer);
