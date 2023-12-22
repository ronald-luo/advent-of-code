const processData = () => {
  const fs = require("fs");
  const data = fs.readFileSync("large.txt").toLocaleString();
  const dataByLine = data.split("\n");

  let pipeMap = dataByLine.map((node) => {
    return node.split("");
  });

  let pipeDict = {};

  let start = null;

  for (let y = 0; y < pipeMap.length; y++) {
    for (let x = 0; x < pipeMap[0].length; x++) {
      pipeDict[`${y},${x}`] = pipeMap[y][x];

      if (pipeMap[y][x] === "S") {
        start = `${y},${x}`;
      }
    }
  }

  return { pipeMap, pipeDict, start };
};

const pipeTraversal = (pipeDict, node, seen) => {
  let viableDict = {
    "|": { up: ["|", "7", "F"], down: ["|", "L", "J"] },
    "-": { left: ["-", "L", "F"], right: ["-", "J", "7"] },
    L: { up: ["|", "7", "F"], right: ["-", "J", "7"] },
    J: { up: ["|", "7", "F"], left: ["-", "L", "F"] },
    7: { left: ["-", "L", "F"], down: ["|", "L", "J"] },
    F: { down: ["|", "L", "J"], right: ["-", "J", "7"] },
    S: {
      up: ["|", "7", "F"],
      down: ["|", "L", "J"],
      left: ["-", "L", "F"],
      right: ["-", "J", "7"],
    },
  };

  let temp = node.split(",");
  let coords = temp.join(",");

  if (!(coords in seen)) {
    let current = pipeDict[temp];
    seen[coords] = current;

    temp = temp.map((val) => Number(val));

    let up = `${temp[0] - 1},${temp[1]}`;
    let down = `${temp[0] + 1},${temp[1]}`;
    let left = `${temp[0]},${temp[1] - 1}`;
    let right = `${temp[0]},${temp[1] + 1}`;

    let neighbours = { up: up, right: right, down: down, left: left };
    Object.keys(neighbours).map((node) => {
      if (
        pipeDict[neighbours[node]] !== undefined &&
        pipeDict[neighbours[node]] !== "."
      ) {
        if (
          viableDict[current][node] !== undefined &&
          viableDict[current][node].includes(pipeDict[neighbours[node]])
        ) {
          pipeTraversal(pipeDict, neighbours[node], seen);
        }
      }
    });
  }

  return seen;
};

const main = () => {
  let { pipeDict, start } = processData();

  let result = pipeTraversal(pipeDict, start, {});
  console.log(Object.keys(result).length);
};

main();
