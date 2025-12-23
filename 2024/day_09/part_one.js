const fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf8");

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

console.log(compDiskMap);

// create uncompressed disk map

let diskMap = [];

for (let arr of compDiskMap) {
  for (let i = 0; i < arr[1]; i++) {
    diskMap.push(arr[0]);
  }
}

console.log(diskMap);

// move file blocks with two pointers

let p = 0;
let q = diskMap.length - 1;

while (p <= q) {
  if (diskMap[p] === "." && diskMap[q] !== ".") {
    // p is empty and q is a number, then swap
    diskMap[p] = diskMap[q];
    diskMap[q] = ".";
    // increment p and decrement q
    p++;
    q--;
  } else if (diskMap[p] !== "." && diskMap[q] !== ".") {
    // if both are numbers, move p up until its empty
    p++;
  } else if (diskMap[p] === "." && diskMap[q] === ".") {
    // if both are empty, move q down until its a number
    q--;
  } else if (diskMap[p] !== "." && diskMap[q] === ".") {
    // they are both wrong, so iterate both
    p++;
    q--;
  }
}

console.log(diskMap);

// check sum

let sum = 0;

for (let i = 0; i < diskMap.length; i++) {
  if (diskMap[i] !== ".") sum += i * Number(diskMap[i]);
}

console.log(sum);
