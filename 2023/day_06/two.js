let processData = () => {
  const fs = require("fs");

  const data = fs.readFileSync("large.txt").toLocaleString();

  let temp = data.split("\n");
  let time = Number(
    temp[0]
      .trim()
      .split(":")[1]
      .split(" ")
      .filter((node) => node != "")
      .join("")
  );
  let distance = Number(
    temp[1]
      .trim()
      .split(":")[1]
      .split(" ")
      .filter((node) => node != "")
      .join("")
  );

  return { time, distance };
};

const main = () => {
  let { time, distance } = processData();

  let count = 0;

  for (let i = 0; i < time; i++) {
    let velocity = i;
    let deltaTime = time - i;

    let distanceTravelled = velocity * deltaTime;

    if (distanceTravelled > distance) {
      count += 1;
    }
  }

  console.log(count);
};

main();
