let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Rendering the message on the image
// Time: O(N), Space: O(N), Output: Integer (layer number, 1 digits * 2 digits)
// Preconditions: Each layer is exactly the same size

// Read front to back, from lowest (front) to highest layer (back)
// 0 -> black
// 1 -> white
// 2 -> transparent

console.log("finding layers...");

// 1. Turn input into list of strings
let stream = lines.split("");

// 2. Separate layers into individual arrays
const ROWS = 6;
const COLS = 25;

let layers = [];

// 3. Divide stream into tensor-like object
for (let i = 0; i < stream.length; i += ROWS * COLS) {
  let layer = stream.slice(i, i + ROWS * COLS);
  // console.log(layer);

  let matrix = [];
  for (let j = 0; j < layer.length; j += COLS) {
    matrix.push(layer.slice(j, j + COLS));
  }
  // console.table(matrix);

  layers.push(matrix);
}
console.table(layers);

let finalImage = Array.from({ length: ROWS }, () => {
  return new Array(COLS).fill("2");
});
console.log("before:");
console.table(finalImage);

// 4. Traverse each cell, from layer 1 to final layer, if ever black or white, then break

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    // console.log(finalImage[row][col]);

    // For each cell, traverse all layers
    for (let matrix of layers) {
      // console.table(matrix[row][col]);

      if (matrix[row][col] === "0") {
        // console.log("black selected");
        finalImage[row][col] = "0";
        break;
      } else if (matrix[row][col] === "1") {
        // console.log("white selected");
        finalImage[row][col] = "1";
        break;
      } else {
        // console.log("transparent");
        continue;
      }
    }

    // console.log("");
  }
}

console.log("after:");
console.table(finalImage);
