const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");
let linesArray = lines.split("\n");

linesArray = linesArray.map((line) => {
  return line.trim().split("");
});

// pre-processing

let rows = linesArray.length;
let cols = linesArray[0].length;

let antennaDict = {};

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!(linesArray[r][c] === ".")) {
      if (linesArray[r][c] in antennaDict) {
        antennaDict[linesArray[r][c]].push([c, r]);
      } else {
        antennaDict[linesArray[r][c]] = [[c, r]];
      }
    }
  }
}

console.log(antennaDict);

// find antinodes

let antennaKeys = Object.keys(antennaDict);

let count = 0;
let set = new Set();

for (let key of antennaKeys) {
  let entries = antennaDict[key];
  console.log("---");
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      let a = entries[i];
      let b = entries[j];

      let x1 = a[0];
      let x2 = b[0];
      let y1 = a[1];
      let y2 = b[1];

      let bDiff = [x2 - x1, y2 - y1];
      let aDiff = [x1 - x2, y1 - y2];

      let antinodeA = [x1 + aDiff[0], y1 + aDiff[1]];

      let xBoundA = 0 <= antinodeA[0] && antinodeA[0] < cols;
      let yBoundA = 0 <= antinodeA[1] && antinodeA[1] < rows;

      if (xBoundA && yBoundA) {
        console.log(antinodeA);
        set.add(antinodeA.join(","));
        count += 1;
      }

      let antinodeB = [x2 + bDiff[0], y2 + bDiff[1]];

      let xBoundB = 0 <= antinodeB[0] && antinodeB[0] < cols;
      let yBoundB = 0 <= antinodeB[1] && antinodeB[1] < rows;

      if (xBoundB && yBoundB) {
        console.log(antinodeB);
        set.add(antinodeB.join(","));
        count += 1;
      }

      console.log(" ");
    }
  }
}

console.log(count);
console.log(set.size);
