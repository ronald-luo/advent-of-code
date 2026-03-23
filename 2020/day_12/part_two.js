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
    this.position = [0, 0]; // start at coordinate plane of [0, 0]
    this.waypoint = [10, -1];
  }

  // coordinate map for rotations relative to turn
  turn(op, mag) {
    let steps = (mag / 90) % 4;
    if (op === "L") steps = (4 - steps) % 4; // L90 = R270

    for (let i = 0; i < steps; i++) {
      let [x, y] = this.waypoint;
      this.waypoint = [-y, x]; // single R90 rotation
    }
  }

  move(op, mag) {
    // let [direcX, direcY] = this.direc;
    let [wayX, wayY] = this.waypoint;

    if (op === "F") {
      let [disX, disY] = [wayX * mag, wayY * mag]; // when we encounter F, we want to move to the waypoint, mag times

      this.position[0] += disX; // update the ships new pos
      this.position[1] += disY;
    } else if (op === "N") {
      let [disX, disY] = [0 * mag, -1 * mag]; // assuming N is negative y
      this.waypoint[0] += disX;
      this.waypoint[1] += disY;
    } else if (op === "E") {
      let [disX, disY] = [1 * mag, 0 * mag]; // assuming E is positive x
      this.waypoint[0] += disX;
      this.waypoint[1] += disY;
    } else if (op === "S") {
      let [disX, disY] = [0 * mag, 1 * mag]; // assuming S is positive y
      this.waypoint[0] += disX;
      this.waypoint[1] += disY;
    } else if (op === "W") {
      let [disX, disY] = [-1 * mag, 0 * mag]; // assuming W is negative x
      this.waypoint[0] += disX;
      this.waypoint[1] += disY;
    }
  }
}

console.log(instructions);
let ship = new Ship();
for (let [op, val] of instructions) {
  console.log(ship.position, ship.waypoint);
  console.log(op, val);
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
console.log(shipX, shipY);
console.log(Math.abs(shipX) + Math.abs(shipY));
