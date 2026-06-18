let fs = require("fs");

let lines = fs.readFileSync("small.txt", "utf-8");

// Figure out possible passwords from facts
// Time: O(N * M), Space: O(1), Output: Number (of possibilities)
// Preconditions: six digit number, not decreasing, two adjacent values are the same

let [lo, hi] = lines.split("-").map(Number);

let possible = 0;

for (lo; lo <= hi; lo++) {
  let number = `${lo}`;
  let hasNoDecreasing = true;
  let hasTwoAdjacent = false;

  // console.log(lo);

  for (let i = 1; i < number.length; i++) {
    // console.log(number[i - 1], number[i]);

    if (number[i] === number[i - 1]) hasTwoAdjacent = true;
    else if (number[i] < number[i - 1]) {
      hasNoDecreasing = false;
      break;
    }
  }

  if (hasNoDecreasing && hasTwoAdjacent) possible++;
}

console.log("possible are", possible);
