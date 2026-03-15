let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");

lines = lines.split("\n").map((line) => line.trim());

let valArray = lines.map((node) => {
  return Number(node);
});

// brute force approach
// for (let i = 0; i < valArray.length; i++) {
//   for (let j = i + 1; j < valArray.length; j++) {
//     for (let k = j + 1; j < valArray.length; k++) {
//       if (valArray[i] + valArray[j] + valArray[k] === 2020) {
//         console.log("hello");
//       }
//     }
//   }
// }

let dict = {};

for (let val of lines) {
  let temp = 2020 - val;
  dict[val] = temp;
}
// console.log(dict);

let valArr = Object.keys(dict).map((node) => Number(node));
// console.log(valArr);

for (let i = 0; i < valArr.length; i++) {
  let diff = dict[valArr[i]];

  for (let j = i + 1; j < valArr.length; j++) {
    let temp = diff - valArr[j];
    if (temp in dict) {
      console.log(temp);
    }
  }
}
