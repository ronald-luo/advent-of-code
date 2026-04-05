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
  // Note that includes should be "O of L" time complexity, O of C in this use-case
  if (line.includes("mask")) {
    let temp = line.split(" ");
    currentMask = temp[2];
    continue;
  }

  // String Parsing
  let temp = line.split(" ");
  let address = Number(temp[0].split("[")[1].split("]")[0]).toString(2);
  let value = Number(temp[2]);

  // Find every memory address combination, every X splits off into 2, so its 2^N possibilities
  let newAdd = new Array(36).fill(0);
  let addInd = address.length - 1;

  for (let i = currentMask.length - 1; i >= 0; i--) {
    if (currentMask[i] === "0") newAdd[i] = Number(address[addInd]) || 0;
    else if (currentMask[i] === "1") newAdd[i] = 1;
    else {
      newAdd[i] = "X";
    }
    addInd -= 1;
  }

  let queue = [newAdd.join("")];

  while (queue.length) {
    let node = queue.shift();

    if (node.includes("X")) {
      let one = node.replace("X", "1");
      let two = node.replace("X", "0");

      queue.push(one);
      queue.push(two);
    } else {
      // console.log("hello", parseInt(node, 2));
      let finalAdd = parseInt(node, 2);
      dict.set(finalAdd, value);
    }
  }
}

let sum = dict.values().reduce((a, b) => a + b); // O of N time complexity
console.log(sum);
