const fs = require("fs");

let lines = fs.readFileSync("small.txt", "utf8");

lines = lines.trim();

// pre-process

let compDiskMap = [];
let id = 0;

for (let i = 0; i < lines.length; i++) {
  if (i % 2 === 0) {
    compDiskMap[i] = [String(id), Number(lines[i])]; // full [id, length]
    id++;
  } else {
    compDiskMap[i] = [".", Number(lines[i])]; // empty ['.', length]
  }
}

// two pointer method on compressed disk map

let flag = true;

while (flag) {
  let p = 0;
  let q = compDiskMap.length - 1;

  while (p <= q) {
    if (compDiskMap[p][0] === "." && compDiskMap[q][0] !== ".") {
      // p is empty, q is full,

      if (compDiskMap[q][1] <= compDiskMap[p][1]) {
        let temp = compDiskMap[q][1];
        console.log(temp);

        compDiskMap[p] = {
          0: compDiskMap[q],
          1: [".", compDiskMap[p][1] - compDiskMap[q][1]],
        };

        compDiskMap[q] = [".", temp];
        p++;
        q--;
      } else {
        q--;
      }
    } else if (compDiskMap[p][0] !== "." && compDiskMap[q][0] === ".") {
      // p is full, q is empty,
      p++;
      q--;
    } else if (compDiskMap[p][0] !== "." && compDiskMap[q][0] !== ".") {
      // both are full,
      p++;
    } else if (compDiskMap[p][0] === "." && compDiskMap[q][0] === ".") {
      // both are empty,
      q--;
    }
  }

  // if object exists then go again
  flag = false;

  let temp = [];

  compDiskMap.forEach((node) => {
    if (node instanceof Array) {
      temp.push(node);
    } else {
      temp.push(node[0]);
      temp.push(node[1]);
      flag = true;
    }
  });

  compDiskMap = temp;
}

console.log(compDiskMap);

// create uncompressed disk map

let diskMap = [];

for (let arr of compDiskMap) {
  for (let i = 0; i < arr[1]; i++) {
    diskMap.push(arr[0]);
  }
}

console.log(diskMap);

// check sum

let sum = 0;

for (let i = 0; i < diskMap.length; i++) {
  if (diskMap[i] !== ".") sum += i * Number(diskMap[i]);
}

console.log(sum);
