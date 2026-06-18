let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

// Running a computer program
// Time: O(N), Space: O(N), Output: Integer (final output)
// Preconditions:
// - a parameter that is overwritten will never be in immediate mode,
// - the pointer should increase by number of values in instruction after instruction finishes

// opcode 1 -> adds numbers together, two parameters
// opcode 2 -> multiplies two inputs, two parameters
// opcode 3 -> takes a single integer as input and saves it to position, one parameter
// opcode 4 -> outputs a value of its only parameter, one parameter

// an opcode can have up to 5 numbers. Any missing digit should be treated as a 0.
// 0 -> position mode
// 1 -> immediate mode

// provide one input instruction: 1, by replacing values at address 1 (from day_02)

// 1. Clean up program
let program = lines.split(",").map(Number);
// console.log(program);

// 2 Create class to handle data flow
class Program {
  constructor(arr) {
    this.program = [...arr];
    this.pointer = 0;
  }

  add(x, y, z, modeX = 0, modeY = 0, modeZ = 0) {
    // x = input 1, y = input 2, z = output
    // console.log("adding", x, y, "to", z);

    if (modeX === 0) {
      x = this.program[x];
    }

    if (modeY === 0) {
      y = this.program[y];
    }

    this.program[z] = x + y;
    this.pointer += 4;
  }

  mult(x, y, z, modeX = 0, modeY = 0, modeZ = 0) {
    // x = input 1, y = input 2, z = output
    // console.log("multing", x, y, "to", z);

    if (modeX === 0) {
      x = this.program[x];
    }

    if (modeY === 0) {
      y = this.program[y];
    }

    this.program[z] = x * y;
    this.pointer += 4;
  }

  write(x, y, modeX = 0, modeY = 0) {
    // x = input 1, y = output
    // console.log("writing...", x, "to", y);
    this.program[y] = x;
    this.pointer += 2;
  }

  read(x, modeX = 0) {
    // x = input 1
    // console.log("reading...");
    if (modeX === 0) {
      x = this.program[x];
    }

    this.pointer += 2;
    console.log("output is", x); // should give us the answer
    return x;
  }

  jumpIfTrue(x, y, modeX = 0, modeY = 0) {
    // console.log("jump if true...");
    if (modeX === 0) {
      x = this.program[x];
    }
    if (modeY === 0) {
      y = this.program[y];
    }
    // console.log(x, y, modeX, modeY);

    if (x !== 0) {
      this.pointer = y;
    } else {
      this.pointer += 3;
    }
  }

  jumpIfFalse(x, y, modeX = 0, modeY = 0) {
    // console.log("jump if false...");
    if (modeX === 0) {
      x = this.program[x];
    }
    if (modeY === 0) {
      y = this.program[y];
    }

    // console.log(x, y, modeX, modeY);

    if (x === 0) {
      this.pointer = y;
    } else {
      this.pointer += 3;
    }
  }

  lessThan(x, y, z, modeX = 0, modeY = 0, modeZ = 0) {
    // console.log("checking if", x, "less than", y);
    if (modeX === 0) {
      x = this.program[x];
    }
    if (modeY === 0) {
      y = this.program[y];
    }

    if (x < y) this.program[z] = 1;
    else this.program[z] = 0;

    this.pointer += 4;
  }

  equals(x, y, z, modeX = 0, modeY = 0, modeZ = 0) {
    // console.log("checking if", x, "equal to", y);
    if (modeX === 0) {
      x = this.program[x];
    }
    if (modeY === 0) {
      y = this.program[y];
    }

    if (x === y) this.program[z] = 1;
    else this.program[z] = 0;

    this.pointer += 4;
  }
}

let problem = new Program(program);
// console.log(problem);

// 3. While we haven't reached the end of the program...
while (problem.pointer < problem.program.length) {
  let val = problem.program[problem.pointer];

  if (val === 99) break;

  let opcode = new Array();

  // 4. Parse the opcode and parameters
  while (val > 0) {
    let rem = val % 10;
    opcode.push(rem);
    val = Math.floor(val / 10);
  }

  while (opcode.length < 5) {
    opcode.push(0);
  }

  let op = opcode[0];
  // console.log(opcode);

  // 5. Process decision tree for op codes, methods and parameters
  if (op === 1) {
    let x = problem.program[problem.pointer + 1];
    let y = problem.program[problem.pointer + 2];
    let z = problem.program[problem.pointer + 3];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;
    let modeZ = opcode[4] || 0;

    problem.add(x, y, z, modeX, modeY, modeZ);
  } else if (op === 2) {
    // console.log(opcode);

    let x = problem.program[problem.pointer + 1];
    let y = problem.program[problem.pointer + 2];
    let z = problem.program[problem.pointer + 3];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;
    let modeZ = opcode[4] || 0;

    problem.mult(x, y, z, modeX, modeY, modeZ);
  } else if (op === 3) {
    let x = 5; // special case
    let y = problem.program[problem.pointer + 1];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;

    problem.write(x, y, modeX, modeY);
  } else if (op === 4) {
    let x = problem.program[problem.pointer + 1];

    let modeX = opcode[2] || 0;

    problem.read(x, modeX);
  } else if (op === 5) {
    let x = problem.program[problem.pointer + 1];
    let y = problem.program[problem.pointer + 2];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;

    // console.log(opcode);

    problem.jumpIfTrue(x, y, modeX, modeY);
  } else if (op === 6) {
    let x = problem.program[problem.pointer + 1];
    let y = problem.program[problem.pointer + 2];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;

    // console.log(opcode);

    problem.jumpIfFalse(x, y, modeX, modeY);
  } else if (op === 7) {
    let x = problem.program[problem.pointer + 1];
    let y = problem.program[problem.pointer + 2];
    let z = problem.program[problem.pointer + 3];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;
    let modeZ = opcode[4] || 0;

    problem.lessThan(x, y, z, modeX, modeY, modeZ);
  } else if (op === 8) {
    let x = problem.program[problem.pointer + 1];
    let y = problem.program[problem.pointer + 2];
    let z = problem.program[problem.pointer + 3];

    let modeX = opcode[2] || 0;
    let modeY = opcode[3] || 0;
    let modeZ = opcode[4] || 0;

    problem.equals(x, y, z, modeX, modeY, modeZ);
  }
}

// console.log("final program", problem.program);
