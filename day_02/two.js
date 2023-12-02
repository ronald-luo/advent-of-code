const fs = require("fs");

fs.readFile("large.txt", "utf8", (err, data) => {
  let lineArray = data.split("\n");

  let powerSum = 0;

  for (let line of lineArray) {
    let cubeCount = {};

    let temp = line.split(":");
    let gameData = temp[1];

    let dataCleanAndHash = gameData
      .trim()
      .split(";")
      .join(",")
      .split(",")
      .map((node) => {
        if (node[0] == " ") {
          node = node.slice(1);
        }
        let temp = node.split(" ");
        let num = temp[0];
        let color = temp[1];

        if (!cubeCount[color]) {
          cubeCount[color] = num;
        }
        cubeCount[color] = Math.max(cubeCount[color], num);

        return temp;
      });

    let setMult = 1;
    for (let val of Object.values(cubeCount)) {
      setMult *= val;
    }
    powerSum += setMult;
  }
  console.log(powerSum);
});
