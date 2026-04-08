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

for (let turn = starting.length + 1; turn <= 2020; turn++) {
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

// Alternate approach:

// let fs = require("fs");

// let lines = fs.readFileSync("small.txt", "utf-8");

// let numbers = lines.split(",").map((node) => Number(node));
// let dict = new Map();

// // number => { prevIndex, count }
// for (let i in numbers) {
//   dict.set(numbers[i], { prevIndex: Number(i) + 1, count: 1 });
// }

// let i = 0;

// while (i < 2020 - numbers.length) {  // FIX 1: correct loop bound
//   let currNumber = numbers.at(-1);
//   let currCount = dict.get(currNumber).count;
//   let nextNumber = null;
//   let currTurn = numbers.length; // this is the turn currNumber was spoken (1-indexed)

//   if (currCount <= 1) {
//     nextNumber = 0;
//   } else {
//     nextNumber = currTurn - dict.get(currNumber).prevIndex;
//   }

//   // FIX 2: update prevIndex for currNumber AFTER computing nextNumber
//   dict.get(currNumber).prevIndex = currTurn;

//   // FIX 3: update nextNumber's entry AFTER updating currNumber
//   if (dict.has(nextNumber)) {
//     dict.get(nextNumber).count += 1;
//   } else {
//     dict.set(nextNumber, { prevIndex: numbers.length + 1, count: 1 });
//   }

//   numbers.push(nextNumber);
//   i++;
// }

// console.log(numbers[2019]);  // FIX 4: 0-indexed, so 2020th number is index 2019
