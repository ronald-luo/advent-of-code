let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());

// console.log(lines);

let devices = lines.map((node) => Number(node));

devices = devices.sort((a, b) => a - b);
console.log(devices);

let jDict = {};
jDict[devices[0]] = 1;

for (let i = 1; i < devices.length; i++) {
  let jDiff = devices[i] - devices[i - 1];
  if (jDiff in jDict) jDict[jDiff] += 1;
  else jDict[jDiff] = 1;
}
jDict[3] += 1;

console.log(jDict[3] * jDict[1]);
