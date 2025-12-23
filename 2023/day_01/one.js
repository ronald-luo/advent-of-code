const fs = require("fs");

fs.readFile("large.txt", "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");

  let total = 0;

  for (let line of lines) {
    let regex = "^[0-9]*";
    let val = "";

    for (let str of line) {
      if (str.match(regex)) {
        val += str.match(regex)[0];
      }
    }

    total += parseInt(val[0] + val.charAt(val.length - 1));
  }

  console.log(total);
});
