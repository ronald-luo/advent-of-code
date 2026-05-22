let fs = require("fs");

let lines = fs.readFileSync("large.txt", "utf-8");
lines = lines.split("\n").map((line) => line.trim());
// console.log(lines);

// Get rules, my ticket, and nearby tickets
// Time: O(N), space: O(N), Output: Rules: Int[] Array, Ticket: Int[] Array
let parser = () => {
  let spaces = 0;
  let rules = [];
  let myTicket;
  let nearbyTickets = [];

  for (let line of lines) {
    if (line === "") {
      spaces++;
      continue;
    }

    if (spaces === 0) {
      // let one = line.split(" or ")[0].split(" ")[1].split("-").map(Number);
      // let two = line.split(" or ")[1].split("-").map(Number);

      let one = line.split(" or ").at(-1).split("-").map(Number);
      let two = line
        .split(" or ")
        .at(-2)
        .split(" ")
        .at(-1)
        .split("-")
        .map(Number);

      // console.log(one);
      // console.log(two);

      rules.push(one);
      rules.push(two);
    }

    if (spaces === 1) {
      if (line === "your ticket:") continue;
      myTicket = line.split(",").map(Number);
    }

    if (spaces === 2) {
      if (line === "nearby tickets:") continue;
      nearbyTickets.push(line.split(",").map(Number));
    }
  }

  // console.log("rules are", rules);
  // console.log("my ticket is", myTicket);
  // console.log("nearby tickets", nearbyTickets);

  return { rules, myTicket, nearbyTickets };
};

let { rules, myTicket, nearbyTickets } = parser(lines);
// console.log("rules are", rules);
// console.log("my ticket is", myTicket);
// console.log("nearby tickets", nearbyTickets);

// Find ticket error rate by scanning each nearby ticket
// Time: ____, Space: ____, Output: Integer
let findErrorRate = (rules, nearbyTickets) => {
  // sort and merge intervals
  let newRules = [rules[0]];
  rules = rules.sort((a, b) => a[0] - b[0]); // N Log N

  for (let i = 1; i < rules.length; i++) {
    if (rules[i][0] - 1 <= newRules[newRules.length - 1][1]) {
      newRules[newRules.length - 1][0] = Math.min(
        newRules[newRules.length - 1][0],
        rules[i][0],
      );
      newRules[newRules.length - 1][1] = Math.max(
        newRules[newRules.length - 1][1],
        rules[i][1],
      );
    } else {
      newRules.push([rules[i][0], rules[i][1]]);
    }
  }

  // console.log(newRules);

  let errorRate = 0;

  for (let arr of nearbyTickets) {
    for (let val of arr) {
      let isInvalid = true;
      for (let [start, stop] of newRules) {
        if (start <= val && val <= stop) isInvalid = false;
      }
      if (isInvalid) errorRate += val;
    }
  }

  return errorRate;
};

let answer = findErrorRate(rules, nearbyTickets);
console.log(answer);
