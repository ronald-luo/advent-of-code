const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");
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

let invalidPages = [];
for (let page of pages) {
  let valid = true;
  for (let i = 1; i < page.length; i++) {
    if (!(page[i - 1] in ruleDict && ruleDict[page[i - 1]].includes(page[i]))) {
      valid = false;
    }
  }
  if (!valid) {
    invalidPages.push(page);
  }
}

// topological sort DFS
let answerArr = [];

for (let page of invalidPages) {
  const updateSet = new Set(page);
  const visited = {};
  const order = [];

  let helper = (node) => {
    if (node in visited && visited[node].permanent) return;
    if (node in visited && visited[node].temporary) return;

    visited[node] = {};
    visited[node].temporary = true;
    visited[node].permanent = false;

    let edges = ruleDict[node] || [];

    for (let edge of edges) {
      if (updateSet.has(edge)) helper(edge);
    }

    visited[node].permanent = true;
    order.push(node);
  };

  for (const node of page) if (!visited[node]) helper(node);
  const ordered = order.reverse();
  answerArr.push(ordered);
}

let sum = 0;

for (let arr of answerArr) {
  sum += Number(arr[Math.floor(arr.length / 2)]);
}

console.log(sum);
