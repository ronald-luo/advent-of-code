// input:
// 3-bit computer, a list of 3 bit numbers (0-7) all combos of 000 -> 111 (8 values)
// 3 registers named A B and C which can hold any number (not just 3 bits)

// instructions:
// we have 8 different instructions
// each instruction is identified by a 3 bit number (opcode)
// the 3 bit number after it is an input called the operand

// instruction pointer:
// the instruction pointer identifies the position in the program (starts at 0)
// the instruction pointer increases by 2 after each instruction
// if it tries to read past the end of the program, we halt.

// there are two types of operands which each instruction will specify:
// 1. literal operand is the operand itself
// 2. combo operand has certain rules
//    a. 0 through 3 are literal operands
//    b. 4 through 6 are A,B and C resp.

// the computer has 8 instructions
// 0. (combo)
// 1. (literal)
// 2. (combo)
// 3. (literal)
// 4. (combo)
// 5. (combo)
// 6. (combo)
// 7. (combo)

// task is to see what out values are produced

const fs = require("fs");

// pre-process input into array and dict

let lines = fs.readFileSync("large.txt", "utf8");
let linesArray = lines.split("\n");

linesArray = linesArray.filter((line) => line.trim() !== "");

let registerDict = {};
let programArr = [];

linesArray = linesArray.map((node, ind) => {
  node = node.trim();
  if (ind === 0) {
    registerDict["A"] = Number(node.split("A: ")[1]);
  } else if (ind === 1) {
    registerDict["B"] = Number(node.split("B: ")[1]);
  } else if (ind === 2) {
    registerDict["C"] = Number(node.split("C: ")[1]);
  } else if (ind === 3) {
    programArr.push(
      ...node
        .split(": ")[1]
        .split(",")
        .map((node) => Number(node))
    );
  }
});

// console.log(linesArray);
// console.log(registerDict);
// console.log(programArr);

// Create a class that reads the instructions

class Computer {
  constructor(register, instructions) {
    this.register = register;
    this.instructions = instructions;
    this.output = [];
    this.pointer = 0;
  }

  // calculates the combo of an operand
  combo(operand) {
    if (0 <= operand && operand <= 3) {
      return operand;
    } else if (operand === 4) {
      return this.register["A"];
    } else if (operand === 5) {
      return this.register["B"];
    } else if (operand === 6) {
      return this.register["C"];
    }
  }

  // 0. (combo) performs division and writes to register A
  adv(operand) {
    let num = this.register["A"];
    let den = 2 ** this.combo(operand);

    let result = Math.floor(num / den);
    this.register["A"] = result;
  }

  // 1. (literal) bitwise XOR reads and writes to register B
  bxl(operand) {
    let result = this.register["B"] ^ operand;
    this.register["B"] = result;
  }

  // 2. (combo) modulo 8 and writes to register B
  bst(operand) {
    let result = this.combo(operand) % 8;
    this.register["B"] = result;
  }

  // 3. (literal + skip) changes the instruction pointer to the literal operand value
  jnz(operand) {
    if (this.register["A"] === 0) return;
    this.pointer = operand;
  }

  // 4. (combo) calculates the bitwise XOR of register B and C, writes to register B
  bxc(operand) {
    let result = this.register["B"] ^ this.register["C"];
    this.register["B"] = result;
  }

  // 5. (combo + output) outputs values as a comma separated list
  out(operand) {
    let result = this.combo(operand) % 8;
    console.log(result);
    this.output.push(result);
  }

  // 6. (combo) works like adv but writes to register B
  bdv(operand) {
    let num = this.register["A"];
    let den = 2 ** this.combo(operand);

    let result = Math.floor(num / den);
    this.register["B"] = result;
  }

  // 7. (combo) works like adv but writes to register C
  cdv(operand) {
    let num = this.register["A"];
    let den = 2 ** this.combo(operand);

    let result = Math.floor(num / den);
    this.register["C"] = result;
  }

  run() {
    while (this.pointer <= this.instructions.length) {
      let opcode = this.instructions[this.pointer];
      let operand = this.instructions[this.pointer + 1];

      let willIncByTwo = true;
      // console.log(opcode);

      if (opcode === 0) {
        this.adv(operand);
        willIncByTwo = true;
      } else if (opcode === 1) {
        this.bxl(operand);
        willIncByTwo = true;
      } else if (opcode === 2) {
        this.bst(operand);
        willIncByTwo = true;
      } else if (opcode === 3) {
        this.jnz(operand);
        willIncByTwo = false;
      } else if (opcode === 4) {
        this.bxc(operand);
        willIncByTwo = true;
      } else if (opcode === 5) {
        this.out(operand);
        willIncByTwo = true;
      } else if (opcode === 6) {
        this.bdv(operand);
        willIncByTwo = true;
      } else if (opcode === 7) {
        this.cdv(operand);
        willIncByTwo = true;
      }

      if (willIncByTwo) {
        this.pointer += 2;
      }
    }
  }
}

let computer = new Computer(registerDict, programArr);
computer.run();
console.log(computer.output);
