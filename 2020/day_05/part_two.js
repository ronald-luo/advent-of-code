let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let instructions = lines;

// B - upper half
// F - lower half
// R - upper half
// L - lower half

let seats = new Set();

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

  seats.add(`${clo},${rlo}`);
};

for (let instruc of instructions) {
  findSeatId(instruc.split(""));
}

for (let r = 0; r < 128; r++) {
  for (let c = 0; c < 8; c++) {
    let seat = `${c},${r}`;

    if (!seats.has(seat)) {
      let neighbors = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];

      let allFilled = true;
      for (let [dc, dr] of neighbors) {
        let [nc, nr] = [c + dc, r + dr];

        let rowBound = 0 <= nr && nr < 128;
        let colBound = 0 <= nc && nc < 8;

        if (!rowBound || !colBound) continue;
        if (!seats.has(`${nc},${nr}`)) allFilled = false;
      }

      if (allFilled) console.log(seat); // 7, 72 (583)
    }
  }
}
