// data processing
let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());
console.log(lines);

// X means stay the same
// 1 or 0 means change to value in mask

// Need
// 1. Create a dictionary to store values written to memory, O of N space complexity
// 2. Way to convert binary to integer value and back, O of C time complexity (ideally)
// 2a. Way to compare string of mask and compute desired binary, O of C time complexity
// 3. A loop to iterate through each instruction, O of N time complexity

let dict = new Map(); // O of N space complexity
let currentMask = "";

// O of N time complexity
for (let line of lines) {
  // includes should be "O of L" time complexity, O of C in this use-case
  if (line.includes("mask")) {
    let temp = line.split(" ");
    currentMask = temp[2];
    continue;
  }

  // String Parsing
  let temp = line.split(" ");
  let address = temp[0].split("[")[1].split("]")[0];
  let value = Number(temp[2]).toString(2);

  // Find new integer
  let newValue = new Array(36).fill(0); // O of C space complexity, always 36 bits
  let valInd = value.length - 1;

  // O of C time complexity, always 36 bits
  for (let i = currentMask.length - 1; i >= 0; i--) {
    if (currentMask[i] === "1") newValue[i] = "1";
    else if (currentMask[i] === "0") newValue[i] = "0";
    else {
      newValue[i] = value[valInd] || 0; // handles when valInd < 0
    }

    valInd -= 1;
  }

  let newValInt = parseInt(newValue.join(""), 2); // O of N time complexity
  dict.set(address, newValInt);
}

let sum = dict.values().reduce((a, b) => a + b); // O of N time complexity
console.log(sum);
