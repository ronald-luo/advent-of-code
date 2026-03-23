let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());

// O(N) time complexity to parse .txt instructions
let instructions = lines.map((node) => {
  let direc = node[0];
  let magn = Number(node.slice(1));
  return [direc, magn];
});

function mod(n, m) {
  return ((n % m) + m) % m;
}

// we'll assume that L and R are always multiples of 90
// 90, 180, 270, 360, 450...
class Ship {
  constructor() {
    this.direc = [1, 0]; // consider a unit vector pointing right [x, y]
    this.position = [0, 0]; // start at coordinate plane of [0, 0]
  }

  turn(op, mag) {
    let normalMag = mag % 360; // gracefully handles values above 360
    let turnCount = (4 * normalMag) / 360;

    let directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    let direcDict = {
      "1,0": 0,
      "0,1": 1,
      "-1,0": 2,
      "0,-1": 3,
    };

    let currentInd = direcDict[this.direc.join(",")];

    if (op === "R") {
      // let nextDirec = directions[(currentInd + turnCount) % directions.length];
      let nextDirec =
        directions[mod(currentInd + turnCount, directions.length)];
      this.direc = nextDirec;
    } else if (op === "L") {
      // let nextDirec = directions[(currentInd - turnCount) % directions.length];
      let nextDirec =
        directions[mod(currentInd - turnCount, directions.length)];
      this.direc = nextDirec;
    }
  }

  move(op, mag) {
    let [direcX, direcY] = this.direc;

    if (op === "F") {
      let [disX, disY] = [direcX * mag, direcY * mag];
      this.position[0] += disX;
      this.position[1] += disY;
    } else if (op === "N") {
      let [disX, disY] = [0 * mag, -1 * mag]; // assuming N is negative y
      this.position[0] += disX;
      this.position[1] += disY;
    } else if (op === "E") {
      let [disX, disY] = [1 * mag, 0 * mag]; // assuming E is positive x
      this.position[0] += disX;
      this.position[1] += disY;
    } else if (op === "S") {
      let [disX, disY] = [0 * mag, 1 * mag]; // assuming S is positive y
      this.position[0] += disX;
      this.position[1] += disY;
    } else if (op === "W") {
      let [disX, disY] = [-1 * mag, 0 * mag]; // assuming W is negative x
      this.position[0] += disX;
      this.position[1] += disY;
    }
  }
}

console.log(instructions);
let ship = new Ship();
for (let [op, val] of instructions) {
  // console.log(op, val);
  if (op === "L" || op === "R") {
    // turn
    ship.turn(op, val);
  } else if (
    op === "N" ||
    op === "E" ||
    op === "S" ||
    op === "W" ||
    op === "F"
  ) {
    // move
    ship.move(op, val);
  }
}
let [shipX, shipY] = ship.position;
console.log(Math.abs(shipX) + Math.abs(shipY));
