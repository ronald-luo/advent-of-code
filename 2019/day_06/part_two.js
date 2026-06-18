let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Find total direct and indirect orbits
// Time: O(V * (V + E)), Space: O(V + E), Output: Integer (number of direct and indirect orbits)
// Preconditions: Cycles may or may not exist, this can be rep. as an undirected graph

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

// Iterative BFS with a stack, O(V + E) time
let bfs = (start) => {
  let queue = [[start, -1]];

  let visited = new Map();

  while (queue.length) {
    let [curr, dist] = queue.shift(); // O(N) in JS, would be O(1) with heap

    for (let neighbor of adj.get(curr) || []) {
      if (visited.has(neighbor)) continue;
      visited.set(neighbor, dist + 1);
      queue.push([neighbor, dist + 1]);
    }
  }

  // console.log(visited);
  return visited;
};

let me = bfs("YOU");
let santa = bfs("SAN");

// 4. Find a body we're both orbiting and add the distances up, O(N) time

let lowest = Infinity;

for (let [key, val] of me) {
  // console.log(key);
  if (santa.has(key)) {
    lowest = Math.min(lowest, me.get(key) + santa.get(key));
  }
}

console.log("minimum distance is", lowest);
