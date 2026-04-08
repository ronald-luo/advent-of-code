// data processing
let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

let numbers = lines.split(",").map((node) => Number(node));
let dict = new Map();
console.log(dict, numbers);

let starting = numbers;
let lastSpoken = new Map();

// Seed starting numbers (1-indexed turns)
for (let i = 0; i < starting.length - 1; i++) {
  lastSpoken.set(starting[i], i + 1);
}

let prev = starting[starting.length - 1];

for (let turn = starting.length + 1; turn <= 30000000; turn++) {
  let next;
  if (lastSpoken.has(prev)) {
    next = turn - 1 - lastSpoken.get(prev);
  } else {
    next = 0;
  }
  lastSpoken.set(prev, turn - 1);
  prev = next;
}

console.log(prev);
