let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Run program and update state, then find value at position 0
// Time: O(N), Space: O(N), Output: Integer (at pos 0)
// Preconditions: Position 0 will not be an undefined number

// 1. Store the program

let vals = lines.split(",").map(Number);
console.log(vals);

// 2. Initialze state
vals[1] = 12;
vals[2] = 2;

// 3. Run program
for (let i = 0; i < vals.length; i += 4) {
  console.log(vals[i + 0]);
  console.log(vals[i + 1]);
  console.log(vals[i + 2]);
  console.log(vals[i + 3]);
  console.log("");

  let op = vals[i + 0];
  let read1 = vals[i + 1];
  let read2 = vals[i + 2];
  let write = vals[i + 3];

  if (op === 1) {
    vals[write] = vals[read1] + vals[read2];
  } else if (op === 2) {
    vals[write] = vals[read1] * vals[read2];
  } else if (op === 99) break;
}

console.log("program finished");
console.table(vals);
