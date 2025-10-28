const fs = require("fs");

// pre-process input into warehouse and instructions

let lines = fs.readFileSync("small.txt", "utf8");
let linesArray = lines.split("\n");

let boundary = linesArray.indexOf("\r");

let warehouse = linesArray.slice(0, boundary);

warehouse = warehouse.map((node) => {
  return node.trim().split("");
});

let instructions = linesArray.slice(boundary + 1, linesArray.length);

instructions = instructions.map((node) => {
  return node.trim().split("");
});

console.log(warehouse.map((node) => node.join("")));

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

// traverse the warehouse and convert to new warehouse

let newWarehouse = [];
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    row.push("");
  }
  newWarehouse.push(row);
}

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let currChar = warehouse[r][c];

    if (currChar === "#") {
      newWarehouse[r][c] = "##";
    } else if (currChar === "O") {
      newWarehouse[r][c] = "[]";
    } else if (currChar === ".") {
      newWarehouse[r][c] = "..";
    } else if (currChar === "@") {
      newWarehouse[r][c] = "@.";
    }
  }
}

warehouse = [];

for (let row of newWarehouse) {
  let newRow = [];
  for (let col of row) {
    newRow.push(...col.split(""));
  }
  warehouse.push(newRow);
}

console.log(warehouse.map((node) => node.join("")));
console.log(instructions.map((node) => node.join("")));

let direcDict = {
  "<": [-1, 0],
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
};

let [currCol, currRow] = [startCol * 2, startRow];

for (let instruction of instructions) {
  for (let instrucSymbol of instruction) {
    let [moveCol, moveRow] = direcDict[instrucSymbol];

    let [nextCol, nextRow] = [currCol + moveCol, currRow + moveRow];
    let nextChar = warehouse[nextRow][nextCol];

    if (nextChar === ".") {
      console.log("moving forward", instrucSymbol, nextChar);
      warehouse[nextRow][nextCol] = "@";
      warehouse[currRow][currCol] = ".";

      currCol = nextCol;
      currRow = nextRow;
    } else if (nextChar === "#") {
      console.log("can't move", instrucSymbol, nextChar);
      continue;
    } else if (nextChar === "[" || nextChar === "]") {
      console.log("box in the way", instrucSymbol, nextChar);
      // when left or right direction is applied, the force only works along the row
      // when up or down direction is applied, horizontal force will apply

      let willPush = false;
      let scalar = 1;
      while (nextChar === "[" || nextChar === "]") {
        nextCol = nextCol + moveCol;
        nextRow = nextRow + moveRow;

        nextChar = warehouse[nextRow][nextCol];
        if (
          nextChar === "." &&
          (instrucSymbol === "<" || instrucSymbol === ">")
        ) {
          willPush = true;
          break;
        } else if (instrucSymbol === "^" || instrucSymbol === "v") {
          // find all connected boxes
          // figure out if all leaves have empty space, if yes then willPush is true
          // let dfs = (node, boxSet = new Set()) => {
          //   if (node === null) return;
          //   //
          //   let [currCol, currRow] = node;
          //   let currChar = warehouse[row][col];
          //   boxSet.add(`${currCol},${currChar}`);
          //   if (currChar === "]") {
          //     let [nextCol, nextRow] = [currCol - 1, currRow + 0];
          //     dfs([nextCol, nextRow]);
          //   } else if (currChar === "[") {
          //     let [nextCol, nextRow] = [currCol - 1, currRow + 0];
          //     dfs([nextCol, nextRow]);
          //   }
          // };
          // dfs([currCol + moveCol, currRow + moveRow]);
          //
          //
        } else if (nextChar === "#") {
          willPush = false;
          break;
        }

        scalar++;
      }

      if (willPush && instrucSymbol === "<") {
        console.log("  applying push", instrucSymbol, nextChar, scalar);

        warehouse[nextRow][nextCol] = "[";

        for (let i = nextCol + 1; i < currCol; i += 2) {
          warehouse[nextRow][i - 1] = "[";
          warehouse[nextRow][i] = "]";
        }
        warehouse[currRow + moveRow][currCol + moveCol] = "@";
        warehouse[currRow][currCol] = ".";

        currCol = currCol + moveCol;
        currRow = currRow + moveRow;
      }

      if (willPush && instrucSymbol === ">") {
        console.log("  applying push", instrucSymbol, nextChar, scalar);

        warehouse[nextRow][nextCol] = "]";

        for (let i = nextCol; i >= currCol; i -= 2) {
          warehouse[nextRow][i - 1] = "[";
          warehouse[nextRow][i] = "]";
        }
        warehouse[currRow + moveRow][currCol + moveCol] = "@";
        warehouse[currRow][currCol] = ".";

        currCol = currCol + moveCol;
        currRow = currRow + moveRow;
      }

      if (willPush && instrucSymbol === "^") {
        console.log("  applying push", instrucSymbol, nextChar, scalar);

        let boxDict = {};
        console.log(nextChar);
      }

      // else {
      //   console.log("  can't apply push", instrucSymbol, nextChar);
      // }
    }
    console.log(warehouse.map((node) => node.join("")));
  }
}
