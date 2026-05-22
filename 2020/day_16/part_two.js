let fs = require("fs");

let lines = fs.readFileSync("small.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());
console.log(lines);
