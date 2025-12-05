let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) => node.trim());

let ranges = [];
let i = 0;
for (i = 0; i < lines.length; i++) {
  if (lines[i] === "") break;
  let [start, stop] = lines[i].split("-");
  ranges.push([Number(start), Number(stop)]);
}

let vals = [];
for (i++; i < lines.length; i++) {
  vals.push(Number(lines[i]));
}

ranges = ranges.sort((a, b) => a[0] - b[0]);
console.log(ranges);

let mergedRanges = [ranges[0]];

let [prevStart, prevStop] = [null, null];

for (let j = 1; j < ranges.length; j++) {
  let [currStart, currStop] = ranges[j];
  [prevStart, prevStop] = mergedRanges[mergedRanges.length - 1] || [null, null];

  if (prevStart == null || prevStop === null) {
    mergedRanges.push([currStart, currStop]);
  } else if (currStart <= prevStop) {
    mergedRanges[mergedRanges.length - 1] = [
      Math.min(prevStart, currStart),
      Math.max(prevStop, currStop),
    ];
  } else {
    mergedRanges.push([currStart, currStop]);
  }
}

console.log(mergedRanges);
console.log(vals);

let binSearch = (target) => {
  let p = 0;
  let q = mergedRanges.length - 1;

  while (p <= q) {
    let pivot = Math.floor((p + q) / 2);
    let [guessStart, guessStop] = mergedRanges[pivot];

    if (guessStart <= target && target <= guessStop) return true;
    else if (guessStart > target) {
      q = pivot - 1;
    } else if (guessStart < target) {
      p = pivot + 1;
    }
  }

  return false;
};

let answer = 0;
for (let val of vals) {
  if (binSearch(val)) answer++;
}

console.log("answer is", answer);
