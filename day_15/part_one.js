const fs = require("fs");

// pre-process input into warehouse and instructions

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

let boundary = linesArray.indexOf("");

let warehouse = linesArray.slice(0, boundary);

warehouse = warehouse.map((node) => {
  return node.trim().split("");
});

let instructions = linesArray.slice(boundary + 1, linesArray.length);

instructions = instructions.map((node) => {
  return node.trim().split("");
});

console.log(warehouse);

// go through warehouse and assign items to coords

let whDict = {};

let rows = warehouse.length;
let cols = warehouse[0].length;

let startRow = 0;
let startCol = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (warehouse[r][c] === "@") {
      startRow = r;
      startCol = c;
    }
    whDict[`${c},${r}`] = warehouse[r][c];
  }
}

console.log(instructions.map((node) => node.join("")));
console.log(startCol, startRow);

// traverse the map using the instructions given

let direcDict = {
  "<": [-1, 0],
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
};

// look at the starting coord of the robot, and the given instruction direction
// if the space is empty (i.e '.') then set the robot's pos to the new coord and set the current space to empty
// if the space is full (i.e '#) then do not change the robot's pos.
// if the space is a box (i.e 'O) then det. consecutive boxes
//  if the space after the last consec. box is empty, then shift all boxes in the direction
//    move the robot's new pos to the given direction and set the current space to empty
//  else do not change the robot's pos.

let [curCol, curRow] = [startCol, startRow];

for (let instruction of instructions) {
  for (let direcSymbol of instruction) {
    // console.log(direcSymbol);
    let moveDirec = direcDict[direcSymbol];
    let [moveCol, moveRow] = moveDirec;

    let [nextCol, nextRow] = [curCol + moveCol, curRow + moveRow];
    let nextChar = warehouse[nextRow][nextCol];

    if (nextChar === ".") {
      // console.log("we moving", direcSymbol);
      warehouse[nextRow][nextCol] = "@";
      warehouse[curRow][curCol] = ".";

      // [curCol, curRow] = [nextCol, nextRow];
      curCol = nextCol;
      curRow = nextRow;
    } else if (nextChar === "#") {
      // console.log("we not moving", direcSymbol);
    } else if (nextChar === "O") {
      let willPush = false;
      // while the nextChar is "O"
      // look at the new direction, apply it also to the next next pos
      while (nextChar === "O") {
        nextCol = nextCol + moveCol;
        nextRow = nextRow + moveRow;

        nextChar = warehouse[nextRow][nextCol];
        // console.log("approach box", direcSymbol, nextChar);
        if (nextChar === ".") {
          willPush = true;
          break;
        } else if (nextChar === "#") {
          willPush = false;
          break;
        }
      }

      if (willPush) {
        // console.log(" push box");
        let [nextRobotCol, nextRobotRow] = [curCol + moveCol, curRow + moveRow];
        warehouse[nextRobotRow][nextRobotCol] = "@";
        warehouse[curRow][curCol] = ".";
        warehouse[nextRow][nextCol] = "O";

        curCol = nextRobotCol;
        curRow = nextRobotRow;
      } else {
        // console.log("  cant push box");
      }
    }
    // console.log(warehouse.map((node) => node.join("")));
  }
}

console.log(warehouse.map((node) => node.join("")));

// get the GPS sum they want

let answer = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (warehouse[r][c] === "O") {
      answer += r * 100 + c;
    }
  }
}

console.log(answer);
