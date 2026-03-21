let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());

let vals = lines.map((node) => Number(node));
console.log(vals);

let preambleSize = 25;

// add 5 initial values to dict (pre-amble)
// O(N) space complexity
let dict = new Set();
for (let i = 0; i < preambleSize; i++) {
  dict.add(vals[i]);
}
console.log(dict);

// Un-optimized, this is O(N**2) time-complexity in the worst case (i.e if pre-amble is half the input size)
let removeInd = 0;
for (let i = preambleSize; i < vals.length; i++) {
  // iterate through the previous 5 pre-able to find a match
  let potVals = [...dict];
  let preambleFound = false;
  for (let potVal of potVals) {
    let diff = vals[i] - potVal;
    if (dict.has(diff)) {
      preambleFound = true;
      break;
    }
  }

  dict.add(vals[i]); // add newest valid value to cache
  dict.delete(vals[removeInd]); // invalidate oldest cache item by index

  // when we go through all pre-amble and still dont find it
  // log the invalid val
  if (!preambleFound) {
    console.log("first invalid val is", vals[i]);
    break;
  }

  removeInd++;
}

console.log(dict);
