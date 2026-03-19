let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());
// console.log(lines);

let groups = [new Set()];
let groupCount = 0;
for (let line of lines) {
  if (line === "") {
    groups.push(new Set());
    groupCount++;
    continue;
  }

  for (let char of line) {
    groups[groupCount].add(char);
  }
}

let sum = 0;
for (let group of groups) {
  sum += group.size;
}
console.log(sum);
