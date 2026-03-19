let fs = require("fs");

let lines = fs.readFileSync("small.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());
let instructions = lines;

let adjGraph = {};

for (let instruc of instructions) {
  let temp = instruc.split(" contain ");
  let = [parentAdj, parentCol, _bags] = temp[0].split(" ");
  // console.log(parentAdj, parentCol);

  let children = temp[1].split(", ");
  children = children.map((node) => {
    let [childCount, childAdj, childCol, _bags] = node.split(" ");
    if (childCount === "no") return;
    return {
      childCount: Number(childCount),
      // childAdj,
      // childCol,
      bag: `${childAdj}-${childCol}`,
    };
  });
  // console.log(children);

  if (children[0] === undefined) children = [];
  adjGraph[`${parentAdj}-${parentCol}`] = children;
}
// console.log(adjGraph);

let helper = (node) => {
  let neighbors = adjGraph[node];
};

console.log(adjGraph["shiny-gold"]);
let temp = helper("shiny-gold");
console.log(temp);
