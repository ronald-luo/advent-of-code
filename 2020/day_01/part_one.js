let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let valArray = lines.map((node) => {
  return Number(node);
});

let dict = {};

for (let val of lines) {
  let temp = 2020 - val;
  dict[temp] = val;
  if (val in dict) console.log(val * dict[val]);
}
