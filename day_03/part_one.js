const fs = require("fs");

let line = fs.readFileSync("long.txt", "utf8");

let sum = 0;
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
          sum += vals[0] * vals[1];
          console.log(vals);
          break;
        }
      }
    }
  }
}

console.log(sum); // not working
