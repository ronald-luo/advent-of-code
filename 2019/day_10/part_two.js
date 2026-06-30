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
// console.log(scores);
// let largest = Math.max(...scores.values());

// Pt 2. Which coordinate will be the 200th asteroid to be vaporized?
// Our laser starts by pointing up and rotates clockwise

// 4. Find the coordinate of the asteroid with the best location

let monitoringCoords = "";
let largest = 0;

for (let [coord, score] of scores) {
  if (score >= largest) {
    largest = Math.max(largest, score);
    monitoringCoords = coord;
  }
}
console.log(monitoringCoords);
// console.log("largest number of monitored asteroids", largest);

// 5. Compare the monitoring location to every other asteroid
let [mCol, mRow] = monitoringCoords.split(",").map(Number);
// console.log(mCol, mRow);

let astRadsFromNorth = new Map(); // Rad => [{ast data}, {ast data}...]

for (let asteroid of asteroids) {
  let [aCol, aRow] = asteroid.split(",").map(Number);
  if (aCol === mCol && aRow === mRow) continue;

  // 6. Normalize, and get the rads of each coord relative to North
  let [normCol, normRow] = [aCol - mCol, aRow - mRow];

  let hypotenuse = (normCol ** 2 + normRow ** 2) ** 0.5;
  let opposite = Math.abs(normRow);

  let theta = Math.asin(opposite / hypotenuse);

  // console.log(normCol, normRow);
  let rads;

  if (normCol >= 0 && normRow <= 0) {
    rads = 0.5 * Math.PI - theta; // top right quadrant
  } else if (normCol >= 0 && normRow > 0) {
    rads = 0.5 * Math.PI + theta; // bottom right quadrant
  } else if (normCol < 0 && normRow > 0) {
    rads = Math.PI + 0.5 * Math.PI - theta; // bottom left quadrant
  } else if (normCol < 0 && normRow <= 0) {
    rads = 1.5 * Math.PI + theta; // top left quadrant
  }

  rads = rads.toFixed(6);

  // 7. Asteroids that share the same angle added to value array
  if (!astRadsFromNorth.has(rads)) astRadsFromNorth.set(rads, []);
  astRadsFromNorth.get(rads).push({
    normalizedCoord: [normCol, normRow],
    actualCoord: [aCol, aRow],
    magnitude: hypotenuse,
  });

  // console.log(aCol, aRow);
}
// console.table(astRadsFromNorth);

// 8. Sort the asteroids that share the same angle by their magnitude (distance from station)
for (let [key, val] of astRadsFromNorth) {
  val = val.sort((a, b) => b.magnitude - a.magnitude);
  // console.log("key", key);
  // console.log(val);
  // console.log("");
}

// 9. Iterate 200 asteroids, popping one each time, to get final answer
let queue = Array.from(astRadsFromNorth.keys()).sort();
// console.log(queue);

let count = 0;
let i = 0;
let lastDestroyed;

while (count < 200) {
  let current = queue[i % queue.length];
  let sharedAngle = astRadsFromNorth.get(current) || [];

  if (!sharedAngle.length) {
    i++;
    continue;
  }

  let destroyed = sharedAngle.pop();
  lastDestroyed = destroyed;

  count++;
  i++;
}

let [answerX, answerY] = lastDestroyed.actualCoord;
console.log("answer is", answerX * 100 + answerY);
