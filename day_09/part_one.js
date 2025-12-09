let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) => node.trim());

let coords = lines.map((node) => {
  let [col, row] = node.split(",");
  return [Number(col), Number(row)];
});

coords = coords.sort((a, b) => a[0] - b[0]);

console.log(coords);

let maxArea = -Infinity;

let p = 0;
let q = coords.length - 1;

for (let i = 0; i < coords.length; i++) {
  for (let j = i + 1; j < coords.length; j++) {
    let [iCol, iRow] = coords[i];
    let [jCol, jRow] = coords[j];
    maxArea = Math.max(maxArea, (jCol - iCol + 1) * (jRow - iRow + 1));
  }
}

console.log(maxArea);
