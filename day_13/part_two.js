const fs = require("fs");

// pre-process input into machines array

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

linesArray = linesArray.filter((item) => item !== "\r" && item !== ""); // remove empty lines

linesArray = linesArray.map((node, i) => {
  node = node.trim();
  if (node.includes("Button A")) {
    let temp = node.split(",");
    let ax = temp[0].split("X+")[1];
    let ay = temp[1].split("Y+")[1];
    return [Number(ax), Number(ay)];
  } else if (node.includes("Button B")) {
    let temp = node.split(",");
    let bx = temp[0].split("X+")[1];
    let by = temp[1].split("Y+")[1];
    return [Number(bx), Number(by)];
  } else if (node.includes("Prize")) {
    let temp = node.split(",");
    let px = temp[0].split("X=")[1];
    let py = temp[1].split("Y=")[1];
    return [Number(px) + 10000000000000, Number(py) + 10000000000000];
  }

  return [];
});

console.log(linesArray);

let machines = [];

for (let i = 2; i < linesArray.length; i += 3) {
  let obj = {
    ax: linesArray[i - 2][0], // a
    ay: linesArray[i - 2][1], // a
    bx: linesArray[i - 1][0], // b
    by: linesArray[i - 1][1], // b
    px: linesArray[i][0], // prize
    py: linesArray[i][1], // prize
  };

  machines.push(obj);
}

console.log(machines);

// iterate through machines array and for each machine, brute force
// a way with a greedy /wrt b approach for obtaining the prize

let result = [];

for (let machine of machines) {
  // solve as a series of linear equations
  let n_num = machine.px * machine.by - machine.bx * machine.py;
  let n_den = machine.ax * machine.by - machine.bx * machine.ay;

  let n = n_num / n_den;
  let m = (machine.py - machine.ay * n) / machine.by;

  if (Number.isInteger(n) && Number.isInteger(m)) {
    result.push(n * 3 + m * 1);
  }
}

let answer = result.reduce((a, b) => a + b);
console.log(answer);
