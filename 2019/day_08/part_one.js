let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Find image layger with the fewest 0 digits
// Time: O(N), Space: O(N), Output: Integer (layer number, 1 digits * 2 digits)
// Preconditions: Each layer is exactly the same size

console.log("finding layers...");

// 1. Turn input into list of strings
let stream = lines.split("");

// 2. Separate layers into individual arrays
const ROWS = 6;
const COLS = 25;

let layers = [];
let counts = [];
let depth = 0;

for (let i = 0; i < stream.length; i += ROWS * COLS) {
  let layer = stream.slice(i, i + ROWS * COLS);

  let zeroCount = 0;
  let oneCount = 0;
  let twoCount = 0;

  for (let char of layer) {
    if (char === "0") zeroCount++;
    else if (char === "1") oneCount++;
    else if (char === "2") twoCount++;
  }

  counts.push({
    layer: depth + 1,
    zeroCount,
    oneCount,
    twoCount,
  });

  // console.log(layer);
  layers.push(layer);
  depth++;
}
// console.log(layers);
// console.log(counts);

// 3. Find the layer with the least zeros and compute the final answer, O(N) time
let leastZerosInd = 0;
let leastZeros = counts[0].zeroCount;

for (let i = 1; i < counts.length; i++) {
  let { layer, zeroCount, oneCount, twoCount } = counts[i];

  if (zeroCount <= leastZeros) {
    leastZeros = zeroCount;
    leastZerosInd = i;
  }
}

let leastZerosLayer = counts[leastZerosInd];

console.log("answer is", leastZerosLayer.oneCount * leastZerosLayer.twoCount);
