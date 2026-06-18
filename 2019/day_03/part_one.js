let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Find the closest intersection of wires and get the manhattan distance
// Time: O(N + M), Space: O(N + M), Output: Integer (lowest manhattan distance)
// Preconditions: Each new line represents a wire, a wire does not intersect with itself

// 1. Process lines into two arrays of strings
// console.log("processing lines...");
lines = lines.split("\n").map((line) => line.trim().split(","));

// 2. Define the coordinates of each wire
let coords1 = new Set();
let wire1 = lines[0];

let coords2 = new Set();
let wire2 = lines[1];

// 3. Go through each wire, adding each to set
const movement = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

let bfs = (coords, wire) => {
  let queue = [[0, 0]];

  while (queue.length) {
    let [currCol, currRow] = queue.shift();

    if (!wire.length) continue;
    let instructions = wire.shift();

    let dir = instructions[0];
    let mag = Number(instructions.slice(1));

    let [direcCol, direcRow] = movement[dir];

    let [nextCol, nextRow] = [currCol, currRow];

    for (let i = 1; i <= mag; i++) {
      [nextCol, nextRow] = [nextCol + direcCol, nextRow + direcRow];

      coords.add(`${nextCol},${nextRow}`);
    }

    queue.push([nextCol, nextRow]);
  }
};

bfs(coords1, wire1);
bfs(coords2, wire2);

// 4. Find lowest manhattan distance of all intersections
let intersections = coords1.intersection(coords2);

let lowestDist = Infinity;

for (let temp of intersections) {
  let [x, y] = temp.split(",").map(Number);
  let dist = Math.abs(y - 0) + Math.abs(x - 0);
  lowestDist = Math.min(dist, lowestDist);
}

console.log("smallest manhattan distance is", lowestDist);
