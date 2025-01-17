const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");

const linesArray = lines.split("\n");

let firstArray = [];
let secArray = [];

linesArray.forEach((line) => {
  line = line.split("   ");

  let firstNumber = parseInt(line[0]);
  let secondNumber = parseInt(line[1]);

  firstArray.push(firstNumber);
  secArray.push(secondNumber);
});

firstArray.sort((a, b) => a - b);
secArray.sort((a, b) => a - b);

console.log(firstArray);
console.log(secArray);

let sumDiff = 0;

for (let i = 0; i < firstArray.length; i++) {
  let diff = Math.abs(firstArray[i] - secArray[i]);
  sumDiff += diff;
}

console.log(sumDiff);
