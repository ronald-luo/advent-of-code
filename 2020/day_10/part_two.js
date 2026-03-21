let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());

let devices = lines.map((node) => Number(node));

devices = devices.sort((a, b) => a - b);
devices.unshift(0); // add outlet
devices.push(devices.at(-1) + 3); // add device
console.log(devices);

let deviceDict = {};
for (let val of devices) {
  deviceDict[val] = [];
}

for (let val of devices) {
  for (let i = 1; i <= 3; i++) {
    if (val + i in deviceDict) {
      deviceDict[val].push(val + i);
    }
  }
}

// how many ways are there to go to a leaf node?
console.log(deviceDict);

let ready = []; // memo brings exponential runtime down to O(N)
let values = []; // memo brings exponential runtime down to O(N)

let helper = (node) => {
  let neighbors = deviceDict[node];
  if (neighbors.length === 0) return 1;
  if (ready[node]) return values[node];

  let totalCount = 0;
  for (nb of neighbors) {
    totalCount += helper(nb);
  }
  ready[node] = true;
  values[node] = totalCount;

  return totalCount;
};

let total = helper(devices[0]);
console.log(total);
