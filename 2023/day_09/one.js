const processData = () => {
  const fs = require("fs");

  let data = fs.readFileSync("large.txt").toLocaleString();
  let dataByLine = data.split("\n");

  let historyArray = [];
  data = dataByLine.map((line) => {
    line = line.trim();
    line = line.split(" ");
    line = line.map((node) => Number(node));

    historyArray.push(line);
  });

  return historyArray;
};

const fetchValue = (history, lastValDict) => {
  const isAllZero = history.every((item) => item === 0);

  if (isAllZero) {
    // answer is just the sum of all the last values
    let temp = Object.values(lastValDict);
    let result = temp.reduce((a, b) => a + b);
    return result;
  }

  let depth = Object.keys(lastValDict).length;
  lastValDict[depth] = history.at(-1);

  // fetch next history
  let nextHistory = [];
  let curr = history[0];
  for (let i = 1; i < history.length; i++) {
    let difference = history[i] - curr;
    nextHistory.push(difference);
    curr = history[i];
  }

  return fetchValue(nextHistory, lastValDict);
};

const main = () => {
  let historyArray = processData();

  let result = 0;
  for (let history of historyArray) {
    const val = fetchValue(history, {});
    result += val;
  }

  console.log(result);
};

main();
