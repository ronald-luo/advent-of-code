let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) => node);

let symbols = lines
  .at(-1)
  .split(" ")
  .filter((val) => val !== "");

let vals = [];

for (let c = 0; c < lines[0].length; c++) {
  let curr = "";

  for (let r = 0; r < lines.length - 1; r++) {
    curr += lines[r][c];
  }

  vals.push(Number(curr));
}

vals.unshift(0);

let ansArr = [];

let currOp = null;
let currAns = null;

while (vals.length > 0) {
  let curr = vals.shift();

  if (curr === 0) {
    currOp = symbols.shift();
    if (currAns !== null) ansArr.push(currAns);
    currAns = currOp === "*" ? 1 : 0;
    continue;
  }

  if (currOp === "*") currAns *= curr;
  else if (currOp === "+") currAns += curr;
}

ansArr.push(currAns);

let answer = ansArr.reduce((a, b) => a + b);
console.log("answer is", answer);
