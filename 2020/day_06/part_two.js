let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());
// console.log(lines);

let groups = [new Set()];
let groupCount = 0;
let first = true;
for (let line of lines) {
  if (line === "") {
    first = true;
    groups.push(new Set());
    groupCount++;
    continue;
  }

  if (groups[groupCount].size === 0 && first) {
    groups[groupCount] = new Set(line.split(""));
    first = false;
  } else {
    let temp = new Set(line.split(""));
    groups[groupCount] = groups[groupCount].intersection(temp);
  }
}

console.log(groups);
let sum = 0;
for (let group of groups) {
  sum += group.size;
}
console.log(sum);
