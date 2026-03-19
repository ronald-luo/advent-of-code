let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

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

  let byrValid = 1920 <= Number(byr) && Number(byr) <= 2002;
  let iyrValid = 2010 <= Number(iyr) && Number(iyr) <= 2020;
  let eyrValid = 2020 <= Number(eyr) && Number(eyr) <= 2030;

  let hgtValid = true;
  if (!hgt.includes("in") && !hgt.includes("cm")) hgtValid = false;
  if (hgt.includes("in")) {
    let val = Number(hgt.split("in")[0]);
    if (val < 59 || val > 76) hgtValid = false;
  }
  if (hgt.includes("cm")) {
    let val = Number(hgt.split("cm")[0]);
    if (val < 150 || val > 193) hgtValid = false;
  }

  let hclValid = true;
  if (hcl[0] !== "#") hclValid = false;
  if (hcl.length !== 7) hclValid = false;
  let hclValidChars = new Set("0123456789abcdef");
  for (let i = 1; i < hcl.length; i++) {
    let char = hcl[i];
    if (!hclValidChars.has(char)) hclValid = false;
  }

  let eclValid =
    ecl === "amb" ||
    ecl === "blu" ||
    ecl === "brn" ||
    ecl === "gry" ||
    ecl === "grn" ||
    ecl === "hzl" ||
    ecl === "oth";

  let pidValid = pid.length === 9 && Number.isInteger(Number(pid));

  if (
    !byrValid ||
    !iyrValid ||
    !eyrValid ||
    !hgtValid ||
    !hclValid ||
    !eclValid ||
    !pidValid
  ) {
    continue;
  }

  vCount++;
}
console.log(vCount);
