const fs = require("fs");

fs.readFile("large.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }

  let result = 0;
  let fileLines = data.split("\n");
  let numList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let coordinateMap = {};
  let starCoords = {};
  let seen = {};

  let y = 0;
  for (let line of fileLines) {
    line = line.trim();
    let x = 0;
    for (let char of line) {
      if (char != "." && char in numList) {
        coordinateMap[`${x},${y}`] = char;
      } else if (char === "*") {
        starCoords[`${x},${y}`] = char;
      }
      x += 1;
    }
    y += 1;
  }

  const numBuilder = (x, y, coordinateMap) => {
    if (`${x},${y}` in seen) {
      return 0;
    }

    let result = [];
    let left = Number(x);
    let right = Number(x);

    result.unshift(coordinateMap[`${left},${y}`]); // add the current coordinates value

    while (
      // add values from left of the original coord
      `${left},${y}` in coordinateMap &&
      coordinateMap[`${left - 1},${y}`]
    ) {
      left -= 1;
      result.unshift(coordinateMap[`${left},${y}`]);
      seen[`${left},${y}`] = true;
    }

    while (
      // add values from right of the original coord
      `${right},${y}` in coordinateMap &&
      coordinateMap[`${right + 1},${y}`]
    ) {
      right += 1;
      result.push(coordinateMap[`${right},${y}`]);
      seen[`${right},${y}`] = true;
    }

    console.log(result);
    return Number(result.join(""));
  };

  for (let key of Object.keys(starCoords)) {
    let x = Number(key.split(",")[0]);
    let y = Number(key.split(",")[1]);

    let temp = 1;
    let count = 0;

    if (`${x - 1},${y - 1}` in coordinateMap) {
      let val = numBuilder(x - 1, y - 1, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x + 0},${y - 1}` in coordinateMap) {
      let val = numBuilder(x + 0, y - 1, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x + 1},${y - 1}` in coordinateMap) {
      let val = numBuilder(x + 1, y - 1, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x - 1},${y + 0}` in coordinateMap) {
      let val = numBuilder(x - 1, y + 0, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x + 1},${y + 0}` in coordinateMap) {
      let val = numBuilder(x + 1, y + 0, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x - 1},${y + 1}` in coordinateMap) {
      let val = numBuilder(x - 1, y + 1, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x + 0},${y + 1}` in coordinateMap) {
      let val = numBuilder(x + 0, y + 1, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }
    if (`${x + 1},${y + 1}` in coordinateMap) {
      let val = numBuilder(x + 1, y + 1, coordinateMap);
      if (val != 0) {
        count += 1;
        temp *= val;
      }
    }

    if (count === 2) {
      result += temp;
    }
  }

  console.log(result);
});
