let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let instructions = lines;

// B - upper half
// F - lower half
// R - upper half
// L - lower half

let findSeatId = (instructions) => {
  let [rlo, rhi] = [0, 127];
  let rowInstruc = instructions.slice(0, 7);
  while (rlo <= rhi && rowInstruc.length > 0) {
    let char = rowInstruc.shift();
    let pivot = Math.floor((rlo + rhi) / 2);

    if (char === "B") rlo = pivot + 1;
    else if (char === "F") rhi = pivot - 1;
  }

  let [clo, chi] = [0, 7];
  let colInstruc = instructions.slice(7);
  while (clo <= chi && colInstruc.length > 0) {
    let char = colInstruc.shift();
    let pivot = Math.floor((clo + chi) / 2);

    if (char === "R") clo = pivot + 1;
    else if (char === "L") chi = pivot - 1;
  }

  console.log(rlo, clo);
  return rlo * 8 + clo;
};

let highestId = 0;
for (let instruc of instructions) {
  highestId = Math.max(highestId, findSeatId(instruc.split("")));
  console.log("");
}
console.log(highestId);
