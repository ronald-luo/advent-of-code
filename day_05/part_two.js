const fs = require("fs");

let lines = fs.readFileSync("short.txt", "utf8");
let linesArray = lines.split("\n");

let ruleDict = {};
let pages = [];

// pre-processing
for (let line of linesArray) {
  if (line.includes("|")) {
    let temp = line.split("|");
    let X = temp[0].trim();
    let Y = temp[1].trim();

    if (!ruleDict[X]) {
      ruleDict[X] = [Y];
    } else {
      ruleDict[X].push(Y);
    }
  } else {
    let temp = line.trim().split(",");
    if (temp[0] !== "") {
      pages.push(temp);
    }
  }
}

// console.log(ruleDict);
// console.log(pages);

// if the first page is not in ruleDict, then it cant be valid
// the page following the first page should exist in the array, if it doesn't then it cannot be valid.
let validPages = [];
// get valid pages
for (let page of pages) {
  let valid = true;
  for (let i = 1; i < page.length; i++) {
    if (!(page[i - 1] in ruleDict && ruleDict[page[i - 1]].includes(page[i]))) {
      valid = false;
    }
  }
  if (valid) {
    validPages.push(page);
  }
}

// get middle page number and sum them
let sum = 0;
for (page of validPages) {
  sum += Number(page[Math.floor(page.length / 2)]);
}
console.log(sum);
