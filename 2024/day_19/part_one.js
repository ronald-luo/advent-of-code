const fs = require("fs");

// pre-process input into set and list of tests

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

let towels = [];
let designs = [];

linesArray = linesArray.filter((line) => line.trim() !== "");

console.log(linesArray);
linesArray.forEach((line, idx) => {
  line = line.trim();

  if (idx === 0) {
    towels.push(...line.split(", "));
  } else {
    designs.push(line);
  }
});

let towelSet = new Set(towels);

console.log(towelSet);
console.log(designs);

// get answer with dp solution

let counter = 0;

for (let design of designs) {
  let dp = [];
  let ready = [];

  let helper = (design) => {
    if (design.length < 0) return false;
    if (design === "") return true;
    if (ready[design]) return dp[design];

    let best = false;
    for (let t of towels) {
      if (design.startsWith(t)) {
        if (helper(design.slice(t.length))) best = true;
      }
    }
    dp[design] = best;
    ready[design] = true;

    return best;
  };

  helper(design) ? counter++ : null;
}

console.log(counter);
