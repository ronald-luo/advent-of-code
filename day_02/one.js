const fs = require("fs");

fs.readFile("large.txt", "utf8", (err, data) => {
  let lineArray = data.split("\n");

  let redLimit = 12;
  let greenLimit = 13;
  let blueLimit = 14;

  let idSum = 0;

  for (let line of lineArray) {
    let cubeCount = {};

    let temp = line.split(":");
    let gameId = Number(temp[0].split(" ")[1]);
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

    if (
      cubeCount["red"] <= redLimit &&
      cubeCount["green"] <= greenLimit &&
      cubeCount["blue"] <= blueLimit
    ) {
      idSum += gameId;
    }
  }
  console.log(idSum);
});
