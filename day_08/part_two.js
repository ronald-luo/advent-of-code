const fs = require("fs");

let lines = fs.readFileSync("short.txt", "utf8");
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

      // let antinodeA = [x1 + aDiff[0], y1 + aDiff[1]];

      let xNextA = x1 + aDiff[0];
      let yNextA = y1 + aDiff[1];

      // let xBoundA = 0 <= xNextA && xNextA < cols;
      // let yBoundA = 0 <= yNextA && yNextA < rows;

      while (0 <= xNextA && xNextA < cols && 0 <= yNextA && yNextA < rows) {
        xNextA += aDiff[0];
        yNextA += aDiff[1];

        set.add([xNextA, yNextA].join(","));
      }

      // let antinodeB = [x2 + bDiff[0], y2 + bDiff[1]];

      let xNextB = x2 + bDiff[0];
      let yNextB = y2 + bDiff[1];

      // let xBoundB = 0 <= xNextB && xNextB < cols;
      // let yBoundB = 0 <= yNextB && yNextB < rows;

      while (0 <= xNextB && xNextB < cols && 0 <= yNextB && yNextB < rows) {
        xNextB += bDiff[0];
        yNextB += bDiff[1];

        set.add([xNextB, yNextB].join(","));
      }

      console.log(" ");
    }
  }
}

let count = 0;
console.log(set);
for (let item of set) {
  item = item.split(",").map((node) => Number(node));
  let withinX = 0 <= item[0] && item[0] <= cols;
  let withinY = 0 <= item[1] && item[1] <= rows;

  if (withinX && withinY) count++;
}

console.log(count);
