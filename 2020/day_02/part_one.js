let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

console.log(lines);

let rules = lines.map((node) => {
  let temp = node.split(": ");

  let val2 = temp[0].split("-")[1].split(" ")[0];
  let val1 = temp[0].split("-")[0];

  val1 = Number(val1.trim());
  val2 = Number(val2.trim());

  let char = temp[0].at(-1);

  let str = temp.at(-1);

  return {
    hi: val2,
    lo: val1,
    char: char,
    str: str,
  };
});

let counter = 0;
for (let rule of rules) {
  let count = 0;
  for (s of rule.str) {
    if (s === rule.char) count++;
  }
  if (rule.lo <= count && count <= rule.hi) counter++;
}
console.log(counter);
