let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let dial = new Array();
for (let i = 0; i < 100; i++) {
  dial[i] = i;
}

let currVal = 50;
let zeroCount = 0;
let turnVal = 0;

for (let line of lines) {
  if (line[0] === "L") turnVal = Number(line.split("L")[1]) * -1;
  if (line[0] === "R") turnVal = Number(line.split("R")[1]);

  currVal += turnVal;

  if (dial.at(currVal % dial.length) === 0) {
    zeroCount++;
  }
}

console.log(zeroCount);
