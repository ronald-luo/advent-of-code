// Thought Process:
// 987654321111111 <- case where the best values at the beginning [9,8,7,6]
// 811111111119999 <- case where the best values are at the end
// filling x spots = [9, 9, 9, 9] (2, 4, 12...)
//
// lets say we want to find the first digit spaces = [x, _, _, _];
// where do we look for it? what values can it not be?
// if we want to fill any given spot
//   -> then it has to be before index line.length - (spaces.length - currInd)
// at initialization, this can be modeled as a sliding window
// one important difference is that the problem is asking for the largest subsequence that we can create
// if we model the problem with a sliding window, then we would be computing the largest substring, not subsequence.
//
// the main problem in one sentence:
// what is the largest subsequence of size 12 that we can create from a string of 100 digits between 1-9.
//
// what kind of solution is best suited for this problem?
// probably a dp solution
// why: this feels a lot like the thief problem or the house robber problem
// basically, we're asking how can we optimize for a certain value under constraints like bag size or subsequence size?

let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let helper = (line) => {
  let dp = [];

  let highest = -Infinity;
  let rows = line.length;
  let cols = 12;

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      if (c >= r) {
        row.push(`${line.slice(0, r + 1)}`);
        continue;
      } else if (c === 0) {
        let val = Math.max(...line.slice(0, r + 1).split(""));
        row.push(`${val}`);
        continue;
      }
      row.push("");
    }
    dp.push(row);
  }
  // console.table(dp);

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      let emptySpace = dp[r - 1][c - 1];
      let currRowVal = line[r];

      let prev = Number(dp[r - 1][c]);
      let curr = Number(emptySpace + currRowVal);

      highest = Math.max(prev, curr);

      if (curr > prev) dp[r][c] = emptySpace + currRowVal;
      else dp[r][c] = dp[r - 1][c];
    }
  }
  // console.table(dp);
  // console.log(highest);
  return highest;
};

let answer = 0;
for (let line of lines) {
  answer += helper(line);
}

console.log("answer is", answer);
