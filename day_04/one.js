const fs = require("fs");

fs.readFile("large.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }

  let totalPoints = 0;
  let fileLines = data.split("\n");

  for (let line of fileLines) {
    let game = line.trim().split(" | ");
    let winning = game[0].split(": ")[1].split(" ");
    let hand = game[1].split(" ");

    let winningHash = {};
    let matchPoints = 0;

    winning.map((node) => {
      if (node != "") {
        winningHash[node] = 1;
      }
    });

    hand.map((node) => {
      if (node != "" && node in winningHash) {
        if (matchPoints === 0) {
          matchPoints = 1;
        } else {
          matchPoints *= 2;
        }
      }
    });

    totalPoints += matchPoints;
  }

  console.log(totalPoints);
});
