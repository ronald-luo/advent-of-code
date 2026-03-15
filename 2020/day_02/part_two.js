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
    lo: val1,
    hi: val2,
    char: char,
    str: str,
  };
});

let counter = 0;
for (let rule of rules) {
  let { lo, hi, char, str } = rule;
  console.log(lo, hi, char, str);

  lo -= 1;
  hi -= 1;

  let valid1 = str[lo] === char && str[hi] !== char;
  let valid2 = str[lo] !== char && str[hi] === char;
  if (valid1 || valid2) counter++;
}

console.log(counter);
