let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Find total direct and indirect orbits
// Time: O(V * (V + E)), Space: O(V + E), Output: Integer (number of direct and indirect orbits)
// Preconditions: Cycles may or may not exist, this can be rep. as a directed graph

// 1. Clean up input to create edge list, O(N) time
let edges = lines.split("\n").map((str) => str.trim());
edges = edges.map((node) => node.split(")"));

// console.log(edges);

// 2. Use edge list to create adjacency list, O(N) time
let adj = new Map();
let nodes = new Set();

for (let [a, b] of edges) {
  if (!adj.has(b)) adj.set(b, []);
  adj.get(b).push(a);

  nodes.add(a);
  nodes.add(b);
}

// console.log(adj);
// console.log(nodes);

// 3. From each possible node, lets count the number of neighbors that we can reach with dfs

let count = 0;

// Iterative DFS with a stack, O(V + E) time
let dfs = (start) => {
  let stack = [start];
  let visited = new Set();

  while (stack.length) {
    let curr = stack.pop();

    count++;

    for (let neighbor of adj.get(curr) || []) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      stack.push(neighbor);
    }
  }
};

for (let body of nodes) {
  // console.log(body);
  dfs(body); // O(V) time
}

console.log("edge count", count - nodes.size);
