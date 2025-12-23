const fs = require("fs");

const processData = () => {
  // create data structure
  let scratchCardsMatch = {};
  let data = fs.readFileSync("large.txt").toString();
  let fileLines = data.split("\n");
  let i = 0;

  for (let line of fileLines) {
    let temp = line.trim().split(" | ");
    let winning = temp[0]
      .split(": ")[1]
      .split(" ")
      .filter((node) => {
        return node != "";
      });
    let hand = temp[1].split(" ").filter((node) => {
      return node != "";
    });

    let matchSet = new Set(winning);
    let matchCount = 0;

    hand.map((node) => {
      if (matchSet.has(node)) {
        matchCount += 1;
      }
    });

    scratchCardsMatch[i] = matchCount;
    i++;
  }

  return scratchCardsMatch;
};

const eventProcesser = (eventStack, matchDict) => {
  let scratchCardsCount = {};

  eventStack.map((node) => {
    if (scratchCardsCount[node]) {
      scratchCardsCount[node] += 1;
    } else {
      scratchCardsCount[node] = 1;
    }
  });

  while (eventStack.length > 1) {
    let card = eventStack.shift();
    let matches = matchDict[card];

    console.log(eventStack);
    for (let i = Number(card) + 1; i <= Number(card) + matches; i++) {
      if (scratchCardsCount[i]) {
        scratchCardsCount[i] += 1;
        eventStack.push(String(i));
      } else {
        scratchCardsCount[i] = 1;
        eventStack.push(String(i));
      }
    }
  }

  return scratchCardsCount;
};

const main = () => {
  let matchDict = processData();
  let data = eventProcesser(Object.keys(matchDict), matchDict);

  let result = 0;
  let temp = Object.values(data);
  temp.map((node) => {
    result += node;
  });
  console.log(result);
};

main();
