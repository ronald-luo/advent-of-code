const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) throw err;

  let textMatches = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  const textRegex = /(one|two|three|four|five|six|seven|eight|nine)/gi;
  const valRegex = "^[1-9]";

  const lines = data.split("\n");

  let totalValue = 0;

  for (let line of lines) {
    let lineValues = {};

    let i = 0;
    while (i < line.length) {
      if (line.indexOf("one")) {
        // i = line.indexOf("one");
        lineValues[i] = textMatches["one"];
      } else if (line.indexOf("two")) {
        // i = line.indexOf("two");
        lineValues[i] = textMatches["two"];
      } else if (line.indexOf("three")) {
        // i = line.indexOf("three");
        lineValues[i] = textMatches["three"];
      } else if (line.indexOf("four")) {
        // i = line.indexOf("four");
        lineValues[i] = textMatches["four"];
      } else if (line.indexOf("five")) {
        // i = line.indexOf("five");
        lineValues[i] = textMatches["five"];
      } else if (line.indexOf("six")) {
        // i = line.indexOf("six");
        lineValues[i] = textMatches["six"];
      } else if (line.indexOf("seven")) {
        // i = line.indexOf("seven");
        lineValues[i] = textMatches["seven"];
      } else if (line.indexOf("eight")) {
        // i = line.indexOf("eight");
        lineValues[i] = textMatches["eight"];
      } else if (line.indexOf("nine")) {
        // i = line.indexOf("nine");
        lineValues[i] = textMatches["nine"];
      }
      i += 1;
    }

    for (let i = 0; i < line.length; i++) {
      let match = line[i].match(valRegex);

      if (match) {
        lineValues[i] = match[0];
      }
    }

    let tempNums = Object.values(lineValues);

    console.log(lineValues);
    // console.log(tempNums);
    // console.log(parseInt(tempNums.at(0) + tempNums.at(-1)));
    totalValue += parseInt(tempNums.at(0) + tempNums.at(-1));
  }
  console.log(totalValue);
});
