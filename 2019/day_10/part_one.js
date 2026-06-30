let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// console.log(lines);

// Raycasting from asteroids
// Time: O(N * N), Space: O(N), Output: Integer (Number of other asteroids)
// Preconditions: Right and Down are considered +ve axes.

// 1. Process input
let grid = lines.split("\n").map((line) => line.trim().split(""));

// console.table(grid);

// 2. Collect asteroids in R * C time
const ROWS = grid.length;
const COLS = grid[0].length;

let asteroids = new Set();

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    // console.log(grid[row][col]);
    if (grid[row][col] === "#") asteroids.add(`${col},${row}`);
  }
}

// console.table(asteroids);

// 3. Check unit vectors of each asteroid against every other asteroid, O(N * N) time

let scores = new Map(); // `x,y` => Integer

for (let asteroid1 of asteroids) {
  // console.log(asteroid);
  let [x1, y1] = asteroid1.split(",").map(Number);
  // console.log("current asteroid", x1, y1);
  // console.log("asteroid parent is", x1, y1);
  let slopes = new Set();

  for (let asteroid2 of asteroids) {
    let [x2, y2] = asteroid2.split(",").map(Number);
    if (x1 === x2 && y1 === y2) continue;

    let magnitude = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** (1 / 2);
    // console.log(magnitude);

    let unitVector = [(x2 - x1) / magnitude, (y2 - y1) / magnitude];
    unitVector = unitVector.map((val) => val.toFixed(6)).join(",");

    slopes.add(unitVector);
  }

  // console.log(slopes);
  // console.log("score is", slopes.size);
  scores.set(`${x1},${y1}`, slopes.size);
  // console.log("");
}

console.log(scores);

let largest = Math.max(...scores.values());

console.log("largest number of monitored asteroids", largest);
