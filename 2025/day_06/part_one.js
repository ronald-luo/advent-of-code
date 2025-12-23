let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) =>
  node
    .trim()
    .split(" ")
    .map((node) => Number(node) || node)
    .filter((node) => node !== "")
);

console.log(lines);

let symbols = lines.at(-1);
console.log(symbols);

let answer = 0;

for (let c = 0; c < lines[0].length; c++) {
  let curr = symbols[c] === "*" ? 1 : 0;

  for (let r = 0; r < lines.length - 1; r++) {
    if (symbols[c] === "*") curr *= lines[r][c];
    else curr += lines[r][c];
  }

  answer += curr;
}

console.log("answer is", answer);
