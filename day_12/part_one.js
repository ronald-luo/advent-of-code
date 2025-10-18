const fs = require("fs");

// pre-process input into garden map

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

garden = linesArray.map((node) => {
  return node.trim().split("");
});

// console.log(garden);

let globalVisited = new Set(); // dont explore same region twice

let rows = garden.length;
let cols = garden[0].length;

let bfs = (node, visited = new Set()) => {
  if (node === null || node === undefined) return [0, 0]; // doesn't exist

  let [col, row] = node;

  const rowBound = 0 <= row && row < rows;
  const colBound = 0 <= col && col < cols;

  if (!rowBound || !colBound) return [0, 0]; // out of bounds

  const directions = [
    [0, -1], // up
    [0, 1], // down
    [-1, 0], // left
    [1, 0], // right
  ];

  visited.add(`${col},${row}`);
  globalVisited.add(`${col},${row}`);

  let area = 1;
  let perimeter = 0;

  for (let direc of directions) {
    let nextRow = direc[1] + row;
    let nextCol = direc[0] + col;

    const nextRowBound = 0 <= nextRow && nextRow < rows;
    const nextColBound = 0 <= nextCol && nextCol < cols;

    if (nextRowBound && nextColBound) {
      // check if nbr in bounds
      const currLabel = garden[row][col];
      const nextLabel = garden[nextRow][nextCol];

      if (currLabel === nextLabel) {
        // check if nbr is same as current
        if (!visited.has(`${nextCol},${nextRow}`)) {
          const [childArea, childPerim] = bfs([nextCol, nextRow], visited);
          area += childArea;
          perimeter += childPerim; // no +1 here
        }
      } else {
        perimeter += 1;
      }
    } else {
      perimeter += 1;
    }
  }

  // console.log(visited.size, perimeter);

  return [area, perimeter];
};

// to get perimeter check how many neighbors each cell has
// perimeter is sum of (4 - # neighbors) for each cell

let gardenDict = {};

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!globalVisited.has(`${c},${r}`)) {
      let temp = bfs([c, r]);
      let [area, perimeter] = temp;
      console.log(area, perimeter);
      gardenDict[`${c},${r},${garden[r][c]}`] = area * perimeter;
    }
  }
}

// console.log(gardenDict);
// console.log(Object.keys(gardenDict).length);

let sum = Object.values(gardenDict).reduce((a, b) => a + b);
console.log(sum);
