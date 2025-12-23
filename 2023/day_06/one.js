let processData = () => {
  const fs = require("fs");

  const data = fs.readFileSync("large.txt").toLocaleString();

  let temp = data.split("\n");
  let timeHash = {};
  let times = temp[0]
    .trim()
    .split(":")[1]
    .split(" ")
    .filter((node) => node != "")
    .map((node) => Number(node));
  let distances = temp[1]
    .trim()
    .split(":")[1]
    .split(" ")
    .filter((node) => node != "")
    .map((node, i) => (timeHash[times[i]] = Number(node)));

  return timeHash;
};

let main = () => {
  let timeHash = processData();
  let wins = {};

  for (let time of Object.keys(timeHash)) {
    wins[time] = 0;
    for (let i = 0; i <= time; i++) {
      let velocity = i;
      let deltaTime = time - i;
      let distanceTravelled = velocity * deltaTime;

      if (distanceTravelled > timeHash[time]) {
        wins[time] += 1;
      }
    }
  }

  let temp = Object.values(wins);
  let result = temp.reduce((node, i) => i * node);
  console.log(result);
};

main();
