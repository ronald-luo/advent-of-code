const processData = () => {
  const fs = require("fs");

  let data = fs.readFileSync("large.txt").toLocaleString();
  let dataByLines = data.split("\n");

  let sequence = dataByLines[0].trim().split("");
  sequence = sequence.map((node) => (node === "R" ? 1 : 0));

  let map = {};

  for (let i = 2; i < dataByLines.length; i++) {
    let temp = dataByLines[i].trim().split(" = (");
    let key = temp[0];
    let val = temp[1].slice(0, -1).split(", ");

    map[key] = val;
  }

  return { sequence: sequence, map: map };
};

const main = () => {
  let { sequence, map } = processData();

  console.log(sequence, map);

  let steps = 0;

  let currKey = "AAA";
  let currMap = map[currKey];
  let finish = "ZZZ";

  while (currKey != finish) {
    let direction = sequence[steps % sequence.length];

    currKey = map[currKey][direction];
    currMap = map[currKey];

    steps += 1;
  }

  console.log(steps);
};

main();
