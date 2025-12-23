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

console.log(robots.length);

// create json

// fs.writeFileSync("large.json", JSON.stringify(robots));

// create matrix output

let cols = 101; // width
let rows = 103; // height

let matrix = [];

for (let r = 0; r < rows; r++) {
  let row = [];
  for (let c = 0; c < cols; c++) {
    row.push(0);
  }
  matrix.push(row);
}

// console.log(matrix);

// simulate time and update robots positions according to velocity

let secs = 0;
let count = 0;

while (true) {
  // reset canvas
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      matrix[r][c] = 0;
    }
  }

  // console.log(matrix);

  for (let robot of robots) {
    // let cols = 11; // width
    // let rows = 7; // height

    // to correctly handle wrapping
    // compute the next node and see if its within bounds

    let nextRow = robot.py + robot.vy;
    let nextCol = robot.px + robot.vx;

    let rowBound = 0 <= nextRow && nextRow < rows;
    let colBound = 0 <= nextCol && nextCol < cols;

    // if either one is broken, we need to compute the fixed version
    if (!rowBound) {
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

    matrix[robot.py][robot.px] = 1;
  }

  let check = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === 1) {
        check += 1;
      }
    }
  }

  if (check === robots.length) {
    break;
  }

  secs++;
}

console.log(secs);
console.log(count);
