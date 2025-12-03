let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let helper = (line) => {
  let bestVal = -Infinity;

  for (let i = 0; i < line.length; i++) {
    for (let j = i + 1; j < line.length; j++) {
      bestVal = Math.max(bestVal, Number(line[i] + line[j]));
    }
  }

  return bestVal;
};

let answer = 0;
for (let line of lines) {
  answer += helper(line);
}

console.log("answer is", answer);
