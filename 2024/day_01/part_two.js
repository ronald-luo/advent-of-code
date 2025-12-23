const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");

const linesArray = lines.split("\n");

let firstArray = [];
let secDict = {};

linesArray.forEach((line) => {
  line = line.split("   ");

  let firstNumber = parseInt(line[0]);
  let secondNumber = parseInt(line[1]);

  firstArray.push(firstNumber);

  if (secondNumber in secDict) {
    secDict[secondNumber] += 1;
  } else {
    secDict[secondNumber] = 1;
  }
});

console.log(firstArray);
console.log(secDict);

let similarityScore = 0;
for (let i = 0; i < firstArray.length; i++) {
  if (secDict[firstArray[i]] !== undefined) {
    similarityScore += firstArray[i] * secDict[firstArray[i]];
  }
}

console.log(similarityScore);
