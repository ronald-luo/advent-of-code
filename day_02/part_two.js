let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split(",");

lines = lines.map((range) => {
  let [start, end] = range.split("-");
  return [Number(start), Number(end)];
});

console.log(lines);

let answer = 0;

let helper = (start, end) => {
  let count = 0;

  for (let i = start; i <= end; i++) {
    let val = i.toString();

    let units = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    for (let unit of units) {
      if (val.length % unit === 0 && unit !== val.length) {
        let strUnit = val.slice(0, unit);
        let factor = val.length / unit;

        // console.log(val, unit, strUnit);

        if (strUnit.repeat(factor) === val) {
          answer += Number(val);
          break;
        }
      }
    }
  }

  return count;
};

for (let [i, j] of lines) {
  helper(i, j);
}
console.log(answer);
