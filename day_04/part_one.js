const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");

let linesArray = lines.split("\n");

linesArray = linesArray.map((line) => {
  return line.trim().split("");
});

let count = 0;

for (let i = 0; i < linesArray.length; i++) {
  for (let j = 0; j < linesArray[0].length; j++) {
    if (linesArray[i][j] === "X") {
      count += findMatchingSequence(i, j);
    }
  }
}

console.log(count);

function findMatchingSequence(
  i,
  j,
  direction = "i,j",
  memory = "",
  match = "XMAS"
) {
  let directions = [
    "i - 1,j", // 0 deg
    "i - 1,j + 1", // 45
    "i,j + 1", // 90
    "i + 1,j + 1", // 135
    "i + 1,j", // 180
    "i + 1,j - 1", // 225
    "i,j - 1", // 270
    "i - 1,j - 1", // 315
  ];

  i = eval(direction.split(",")[0]);
  j = eval(direction.split(",")[1]);

  if (i < 0 || i >= linesArray.length || j < 0 || j >= linesArray[0].length) {
    return 0;
  }

  memory += linesArray[i][j];

  if (memory === match) {
    // console.log("match found");
    return 1;
  }
  if (memory !== match.slice(0, memory.length)) {
    return 0;
  }

  if (direction === "i,j") {
    let total = 0;
    for (let direction of directions) {
      total += findMatchingSequence(i, j, direction, memory);
    }
    return total;
  } else {
    return findMatchingSequence(i, j, direction, memory);
  }
}
