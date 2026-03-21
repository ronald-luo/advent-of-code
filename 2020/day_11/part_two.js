let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());

// seat is L -> no neighbours -> becomes occupied
// Seat is # -> 4+ adjacent seats occupied -> becomes empty
// everything happens all at once
// will every seat always be occupied on the first round?

let seats = lines.map((row) => {
  return row.split("");
});
// console.table(seats);

// function that takes a grid and returns the next state of the grid
let helper = (grid) => {
  let rows = seats.length;
  let cols = seats[0].length;

  // can be simplified to a dict to save us from using O(R * C) memory
  // since empty seats stay the same we dont need to keep tracking them
  let nextGrid = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push("");
    }
    nextGrid.push(row);
  }

  // iterate through all cells in format [c, r] or [x, y]
  // Linear time complexity O(N)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // find all neighbours
      let directions = [
        [-1, -1],
        [0, -1],
        [1, -1],

        [-1, 0],
        [1, 0],

        [-1, 1],
        [0, 1],
        [1, 1],
      ];

      let takenSeats = 0;
      // iterate through all neighbours
      for (let [direcCol, direcRow] of directions) {
        let [nextCol, nextRow] = [c + direcCol, r + direcRow];

        let colBound = 0 <= nextCol && nextCol < cols;
        let rowBound = 0 <= nextRow && nextRow < rows;

        while (colBound && rowBound) {
          let validChar =
            grid[nextRow][nextCol] === "#" || grid[nextRow][nextCol] === "L";
          if (validChar) break;

          [nextCol, nextRow] = [nextCol + direcCol, nextRow + direcRow];
          colBound = 0 <= nextCol && nextCol < cols;
          rowBound = 0 <= nextRow && nextRow < rows;
        }

        if (!colBound || !rowBound) continue;
        if (grid[nextRow][nextCol] === "#") takenSeats++;
      }

      if (grid[r][c] === "L" && takenSeats === 0) {
        nextGrid[r][c] = "#"; // becomes occupied
      } else if (grid[r][c] === "#" && takenSeats >= 5) {
        nextGrid[r][c] = "L"; // becomes empty
      } else {
        nextGrid[r][c] = grid[r][c]; // seat state stays the same
      }
    }
  }

  return nextGrid;
};

let grid = helper(seats);
let prevCount = 0;
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    if (grid[r][c] === "#") prevCount++;
  }
}

while (true) {
  nextGrid = helper(grid);

  let count = 0;
  for (let r = 0; r < nextGrid.length; r++) {
    for (let c = 0; c < nextGrid[0].length; c++) {
      if (nextGrid[r][c] === "#") count++;
    }
  }

  if (prevCount === count) {
    console.log(count);
    break;
  }
  grid = nextGrid;
  prevCount = count;
}
