const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");

let linesArray = lines.split("\n");

linesArray = linesArray.map((line) => {
  return line.trim().split("");
});

let count = 0;

for (let i = 0; i < linesArray.length; i++) {
  for (let j = 0; j < linesArray[0].length; j++) {
    if (linesArray[i][j] === "A") {
      count += findMatchingSequence(i, j);
    }
  }
}

console.log(count);

function findMatchingSequence(i, j) {
  let directions = [
    "i - 1,j + 1", // 45
    "i + 1,j + 1", // 135
    "i + 1,j - 1", // 225
    "i - 1,j - 1", // 315
  ];

  for (let direction of directions) {
    r = eval(direction.split(",")[0]);
    c = eval(direction.split(",")[1]);

    if (r < 0 || r >= linesArray.length || c < 0 || c >= linesArray[0].length) {
      return 0;
    }
  }

  let topRight = linesArray[i - 1][j + 1];
  let bottomLeft = linesArray[i + 1][j - 1];

  let firstPairOK =
    (topRight === "M" && bottomLeft === "S") ||
    (topRight === "S" && bottomLeft === "M");

  let topLeft = linesArray[i - 1][j - 1];
  let bottomRight = linesArray[i + 1][j + 1];

  let secondPairOK =
    (topLeft === "M" && bottomRight === "S") ||
    (topLeft === "S" && bottomRight === "M");

  return firstPairOK && secondPairOK ? 1 : 0;
}
