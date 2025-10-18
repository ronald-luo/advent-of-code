const fs = require("fs");

// pre-process input

let lines = fs.readFileSync("large.txt", "utf8");

// iterate to answer

let result = lines.trim().split(" ");
let count = 25;
console.log(result);

while (count > 0) {
  let newResult = [];

  for (let val of result) {
    if (val === "0") {
      // number is "0", convert it to "1"

      newResult.push("1");
    } else if (val.length % 2 === 0) {
      // number is even

      // "10" -> "1" "0"
      // "1423400243" -> "14234" + "00243" -> "243"
      let first = val.slice(0, val.length / 2);
      let second = val.slice(val.length / 2, val.length);

      // if (second[0] === "0" && second.length !== 1) {
      //   // "00243" cut off leading zeros
      //   // "002405"
      //   let prev = second[0];
      //   let cut = 0;
      //   for (let i = 1; i < second.length; i++) {
      //     if (second[i] === prev) {
      //       continue;
      //     } else {
      //       cut = i;
      //       break;
      //     }
      //   }

      //   second = second.slice(cut, second.length);
      // }
      if (second[0] === "0" && second.length !== 1) {
        // second = second.replace(/^0+(?!$)/, "");

        // first = Number(first)
        second = Number(second);
        second = String(second);
      }

      newResult.push(first);
      newResult.push(second);
    } else {
      // number is odd, so multiple by 2024
      newResult.push(String(Number(val) * 2024));
      // newResult.push((BigInt(val) * 2024n).toString());
    }
  }

  result = newResult;
  // console.log(result);
  // if (count === 20) break;
  count--;
}

console.log(result.length);
