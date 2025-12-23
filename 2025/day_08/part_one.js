// requirments:
// i want to be able to input a coordinate and figure out if it belongs to a set of coordinates
// if two coordinates are both part of their own sets, then the two sets are merged into one big set
// we need fast lookup, figuring out if a coordinate is already part of another set
// inputting a pair of coordinates means that the two coordinates together create a set
// scenario 1:
// imagine a friend group. for every member thats already in an existing group,
// when a new member comes in, everyones friendship in the old group should be
// updated with the new member such that looking up an old member will include the newly added member
// scenario 2:
// imagine a friend group that can't go anywhere alone, he brings his other friends with him.
// when he's added to your group, all of his existing friends also becomes part of your friend groups network
// and all of your friends become added to each member of their friend group

let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((node) => node.trim());

let junctions = lines.map((node) => {
  let [x, y, z] = node.split(",");

  return [Number(x), Number(y), Number(z)];
});

let distances = [];

for (let i = 0; i < junctions.length; i++) {
  let [xi, yi, zi] = junctions[i];

  for (let j = i + 1; j < junctions.length; j++) {
    let [xj, yj, zj] = junctions[j];

    let [xDiff, yDiff, zDiff] = [xi - xj, yi - yj, zi - zj];
    let [xSq, ySq, zSq] = [xDiff ** 2, yDiff ** 2, zDiff ** 2];

    let distance = (xSq + ySq + zSq) ** 0.5;

    distances.push([[xi, yi, zi], [xj, yj, zj], distance]);
  }
}

distances = distances.sort((a, b) => a[2] - b[2]);
console.log(distances);

let circuits = new Map();
let iterations = 1000;

while (iterations > 0) {
  let curr = distances.shift();

  let [xi, yi, zi] = curr[0];
  let [xj, yj, zj] = curr[1];

  if (circuits.has(`${xi},${yi},${zi}`) && circuits.has(`${xj},${yj},${zj}`)) {
    for (let keyi of circuits.get(`${xi},${yi},${zi}`).keys()) {
      for (let keyj of circuits.get(`${xj},${yj},${zj}`).keys()) {
        circuits.get(keyi).add(keyj);
        circuits.get(keyj).add(keyi);
      }
    }
  }

  if (circuits.has(`${xi},${yi},${zi}`) && !circuits.has(`${xj},${yj},${zj}`)) {
    circuits.set(`${xj},${yj},${zj}`, circuits.get(`${xi},${yi},${zi}`));
    for (let key of circuits.get(`${xi},${yi},${zi}`).keys()) {
      circuits.get(key).add(`${xj},${yj},${zj}`);
    }
  }

  if (!circuits.has(`${xi},${yi},${zi}`) && circuits.has(`${xj},${yj},${zj}`)) {
    circuits.set(`${xi},${yi},${zi}`, circuits.get(`${xj},${yj},${zj}`));
    for (let key of circuits.get(`${xj},${yj},${zj}`).keys()) {
      circuits.get(key).add(`${xi},${yi},${zi}`);
    }
  }

  if (
    !circuits.has(`${xi},${yi},${zi}`) &&
    !circuits.has(`${xj},${yj},${zj}`)
  ) {
    circuits.set(
      `${xi},${yi},${zi}`,
      new Set([`${xi},${yi},${zi}`, `${xj},${yj},${zj}`])
    );
    circuits.set(
      `${xj},${yj},${zj}`,
      new Set([`${xi},${yi},${zi}`, `${xj},${yj},${zj}`])
    );
  }

  iterations--;
}

let sets = circuits.values();
console.log(sets);

let answers = [];

for (let grp of sets) {
  if (answers.length === 0) {
    answers.push(grp);
  }

  let willPush = true;
  for (let ans of answers) {
    if (grp.difference(ans).size === 0) willPush = false;
  }
  if (willPush) answers.push(grp);
}

answers = answers.sort((a, b) => b.size - a.size);

let sizes = answers.map((node) => node.size);

console.log(sizes);
console.log("answer is", answers[0].size * answers[1].size * answers[2].size);
