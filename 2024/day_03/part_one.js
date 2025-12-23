const fs = require("fs");

let line = fs.readFileSync("long.txt", "utf8");

let arrays = [];
for (let i = 2; i < line.length; i++) {
  let charLead = line[i];
  let charMid = line[i - 1];
  let charFollow = line[i - 2];

  if (charLead === "l" && charMid === "u" && charFollow === "m") {
    if (line[i + 1] === "(") {
      let stack = ["("];

      for (let j = i + 2; j < line.length; j++) {
        let char = line[j];

        if (char === "(") {
          stack.push(char);
        } else if (char === ")") {
          stack.pop();
        }

        if (stack.length === 0) {
          let vals = line.slice(i + 2, j);
          vals = vals.split(",");

          if (vals.length === 2) {
            arrays.push(vals);
          }

          break;
        }
      }
    }
  }
}

let sum = 0;
for (let [x, y] of arrays) {
  x = Number(x);
  y = Number(y);
  if (typeof x !== "number" || typeof y !== "number" || isNaN(x) || isNaN(y)) {
    console.log(x, y);
  } else {
    sum += x * y;
  }
}

console.log(sum); // this works lol?
