let fs = require("fs");

// parse instructions
let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());

let instructions = [];
for (let line of lines) {
  let [operator, val] = line.split(" ");
  // console.log(operator, Number(val));
  instructions.push([operator, Number(val)]);
}

function GameConsole() {
  this.currentInd = 0;
  this.sum = 0;
  this.seen = new Set();
  this.continue = true;
}

// accumulates value that starts at zero
GameConsole.prototype.acc = function (val) {
  if (this.seen.has(this.currentInd)) {
    console.log(this.sum);
    this.continue = false;
  }
  this.seen.add(this.currentInd);
  this.sum += val;
  this.currentInd++;
};

// i'll assume that we cant jump to a value out of bounds
// +values jump to the instruction later in the array
// -values jump to the instruction earlier in the array
GameConsole.prototype.jmp = function (val) {
  if (this.seen.has(this.currentInd)) {
    console.log(this.sum);
    this.continue = false;
  }
  this.seen.add(this.currentInd);
  this.currentInd += val;
};

// does nothing, the instruction below it is executed next
GameConsole.prototype.nop = function () {
  if (this.seen.has(this.currentInd)) {
    console.log(this.sum);
    this.continue = false;
  }
  this.seen.add(this.currentInd);
  this.currentInd++;
};

let game = new GameConsole();
let [currOp, currVal] = instructions[0];

while (game.continue) {
  console.log(currOp, currVal);
  if (currOp === "nop") game.nop();
  else if (currOp === "jmp") game.jmp(currVal);
  else if (currOp === "acc") game.acc(currVal);

  [currOp, currVal] = instructions[game.currentInd];
}
