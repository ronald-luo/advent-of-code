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
    let temp = Object.values(lastValDict);
    let result = temp[0]; // start with first val
    // subtract every even index, add every odd index
    for (let i = 1; i < temp.length; i++) {
      if (i % 2 == 0) {
        result += temp[i];
      } else {
        result -= temp[i];
      }
    }

    return result;
  }

  let depth = Object.keys(lastValDict).length;
  lastValDict[depth] = history.at(0);

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
