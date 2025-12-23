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

let answer = 0;

for (let [start, stop] of mergedRanges) {
  answer += stop - start + 1;
}

console.log("answer is", answer);
