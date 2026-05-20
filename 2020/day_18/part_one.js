let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());
// console.log(lines);

// A function that parses the expression and returns the sum
// Time: O(N), Space: O(N)?, Output: Integer
// Preconditions: we will assume that all expressions are valid
let calculate = (expression) => {
  // console.log(expression);

  let stack = [];
  // 1. solve everything in a parentheses first
  for (let char of expression) {
    stack.push(char);

    let temp = [];
    if (stack.at(-1) === ")") {
      stack.pop();
      while (stack.at(-1) !== "(") {
        temp.push(stack.pop());
      }
      stack.pop();

      let tempTotal = 0;
      let prevOp = null;
      // console.log(temp);
      while (temp.length) {
        // console.log(tempTotal);
        let curr = temp.pop();
        if (tempTotal === 0) {
          tempTotal = Number(curr);
          continue;
        }

        if (curr === "*") {
          prevOp = "*";
          continue;
        } else if (curr === "+") {
          prevOp = "+";
          continue;
        }

        if (prevOp === "*" && tempTotal !== 0) {
          tempTotal *= Number(curr);
          continue;
        } else if (prevOp === "+" && tempTotal !== 0) {
          tempTotal += Number(curr);
          continue;
        }
      }
      stack.push(tempTotal);
    }
  }

  let total = 0;
  let lastOp = null;
  while (stack.length) {
    let curr = stack.shift();
    if (total === 0) {
      total = Number(curr);
      continue;
    }

    if (curr === "*") {
      lastOp = "*";
      continue;
    } else if (curr === "+") {
      lastOp = "+";
      continue;
    }

    if (lastOp === "*") total *= Number(curr);
    else if (lastOp === "+") total += Number(curr);
  }

  return total;
};

let sum = 0;
for (let line of lines) {
  // console.log(line);

  let exp = line.split(" ").map((node) => {
    if (node.length > 1) {
      return node.split("");
    }
    return node;
  });

  exp = exp.flat();
  sum += calculate(exp);
}
console.log("final sum is", sum);
