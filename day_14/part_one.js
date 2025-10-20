const fs = require("fs");

// pre-process input into tile map

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

let robots = linesArray.map((line) => {
  line = line.trim();
  line = line.split(" ");

  let [px, py] = line[0].split("p=")[1].split(",");
  let [vx, vy] = line[1].split("v=")[1].split(",");

  return { px: Number(px), py: Number(py), vx: Number(vx), vy: Number(vy) };
});

console.log(robots);

let secs = 100;

while (secs > 0) {
  for (let robot of robots) {
    let cols = 101; // width
    let rows = 103; // height

    // to correctly handle wrapping
    // compute the next node and see if its within bounds

    let nextRow = robot.py + robot.vy;
    let nextCol = robot.px + robot.vx;

    let rowBound = 0 <= nextRow && nextRow < rows;
    let colBound = 0 <= nextCol && nextCol < cols;

    // if either one is broken, we need to compute the fixed version
    if (!rowBound) {
      // console.log("out of bound row");
      if (nextRow >= rows) {
        nextRow = nextRow % rows;
      } else if (nextRow < 0) {
        nextRow = rows + nextRow;
      }
      robot.py = nextRow;
    } else {
      robot.py += robot.vy;
    }

    if (!colBound) {
      if (nextCol >= cols) {
        nextCol = nextCol % cols;
      } else if (nextCol < 0) {
        nextCol = cols + nextCol;
      }

      robot.px = nextCol;
    } else {
      robot.px += robot.vx;
    }
  }

  secs -= 1;
}

console.log(robots);

// obtain quadrants

let cols = 101; // width
let rows = 103; // height

let halfCols = Math.floor(cols / 2);
let halfRows = Math.floor(rows / 2);

console.log(halfCols, halfRows);

let tr = 0;
let tl = 0;
let br = 0;
let bl = 0;

for (let robot of robots) {
  // console.log(robots)
  if (robot.px < halfCols && robot.py < halfRows) tl++; // top left
  if (robot.px > halfCols && robot.py < halfRows) tr++; // top right
  if (robot.px < halfCols && robot.py > halfRows) bl++; // btm left
  if (robot.px > halfCols && robot.py > halfRows) br++; // btm right
}

console.log(tr, tl, br * bl);
console.log(tr * tl * br * bl);
