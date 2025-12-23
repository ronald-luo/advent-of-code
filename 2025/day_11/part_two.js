let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

let adj = {};

lines = lines.split("\n").map((node) => {
  let [name, connections] = node.trim().split(": ");
  return (adj[name] = connections.split(" "));
});

console.log(adj);

let queue = ["you"];
let counter = 0;

while (queue.length > 0) {
  console.log(queue);
  let curr = queue.shift();

  if (!(curr in adj)) {
    if (curr === "out") counter += 1;
    continue;
  }

  let neighbors = adj[curr] || [];
  for (let neighbor of neighbors) {
    queue.push(neighbor);
  }
}

console.log(counter);
