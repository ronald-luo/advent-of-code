const fs = require("fs");

// pre-process input

let lines = fs.readFileSync("large.txt", "utf8");

// iterate to answer

let result = lines.trim().split(" ");
let count = 75;
console.log(result);

while (count > 0) {
  let newResult = [];

  for (let val of result) {
    if (val === "0") {
      // number is "0", convert it to "1"

      newResult.push("1");
    } else if (val.length % 2 === 0) {
      // number is even

      let first = val.slice(0, val.length / 2);
      let second = val.slice(val.length / 2, val.length);

      if (second[0] === "0" && second.length !== 1) {
        second = Number(second);
        second = String(second);
      }

      newResult.push(first);
      newResult.push(second);
    } else {
      // number is odd, so multiple by 2024
      newResult.push(String(Number(val) * 2024));
    }
  }

  result = newResult;

  count--;
}

console.log(result.length);
