let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split(",");

console.log(lines);

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
    if (val.length % 2 === 1) continue;

    let k = Math.floor(val.length / 2);
    if (val.slice(0, k) === val.slice(k)) {
      console.log(val);
      answer += Number(val);
      count++;
      continue;
    }
  }

  return count;
};

for (let [i, j] of lines) {
  helper(i, j);
}
console.log(answer);
