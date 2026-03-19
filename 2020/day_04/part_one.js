let fs = require("fs");

let lines = fs.readFileSync("small.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());
// console.log(lines);

let pCount = 0; // passenger count
let passengers = [{}];

for (let line of lines) {
  if (line === "") {
    pCount++;
    passengers.push({});
    continue;
  }

  let temp = line.split(" ");
  // console.log(temp);
  temp = temp.map((node) => {
    let [key, val] = node.split(":");
    // console.log(key, val);
    passengers[pCount][key] = val;
  });
  // console.log(temp);
}

// console.log(passengers);
let vCount = 0; // valid count

for (let passenger of passengers) {
  let { byr, iyr, eyr, hgt, hcl, ecl, pid, cid } = passenger;
  // console.log(byr, iyr, eyr, hgt, hcl, ecl, pid, cid);

  if (
    byr === undefined ||
    iyr === undefined ||
    eyr === undefined ||
    hgt === undefined ||
    hcl === undefined ||
    ecl === undefined ||
    pid === undefined
  ) {
    continue;
  }
  vCount++;
}
console.log(vCount);
