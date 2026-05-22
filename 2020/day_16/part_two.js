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
  let fields = new Map();

  for (let line of lines) {
    if (line === "") {
      spaces++;
      continue;
    }

    if (spaces === 0) {
      let name = line.split(": ")[0];

      let one = line.split(" or ").at(-1).split("-").map(Number);
      let two = line
        .split(" or ")
        .at(-2)
        .split(" ")
        .at(-1)
        .split("-")
        .map(Number);

      rules.push(one);
      rules.push(two);

      console.log(name, one, two);
      fields.set(name, { intervals: [[...one], [...two]] });
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

  return { rules, myTicket, nearbyTickets, fields };
};

let { rules, myTicket, nearbyTickets, fields } = parser(lines);
// console.log("rules are", rules);
// console.log("my ticket is", myTicket);
// console.log("nearby tickets", nearbyTickets);
// console.log("fields is", fields);
// console.log(fields.get("class"));

// Find ticket error rate by scanning each nearby ticket
// Time: O(RLogR + N*R), Space: O(R), Output: Integer, R = Rules, N = Vals
let findErrorRate = (rules, nearbyTickets) => {
  // sort and merge intervals
  rules = rules.sort((a, b) => a[0] - b[0]); // N Log N
  let newRules = [rules[0]];
  // console.log("sorted rules is", rules);
  // console.log("newRules is", newRules);

  // O(N) iterate to create merged intervals
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
  // console.log("rule intervals are:", newRules);

  // find all valid tickets
  let validTickets = [];
  // find valid tickets
  for (let ticket of nearbyTickets) {
    let isValid = true;
    for (let val of ticket) {
      let valOk = false;
      for (let [start, stop] of rules) {
        if (start <= val && val <= stop) valOk = true;
      }
      if (!valOk) {
        isValid = false;
        break;
      }
    }
    if (isValid) validTickets.push(ticket);
  }

  let matcher = new Map();

  // match columns against field intervals to determine which field belongs to which
  for (let [fieldKey, field] of fields) {
    // console.log(field);

    for (let c = 0; c < validTickets[0].length; c++) {
      let validCount = 0;
      for (let r = 0; r < validTickets.length; r++) {
        // console.log(validTickets[r][c]);
        for (let [start, stop] of field.intervals) {
          if (validTickets[r][c] >= start && validTickets[r][c] <= stop) {
            // console.log("valid");
            validCount++;
          }
        }
      }

      // console.log(
      //   "validCount is",
      //   validCount,
      //   "col",
      //   c,
      //   "field key is",
      //   fieldKey,
      // );
      if (validCount === validTickets.length) {
        // console.log(validCount);
        if (!matcher.has(c)) matcher.set(c, new Set());
        matcher.get(c).add(fieldKey);
      }
      // console.log("");
    }
  }

  console.log(matcher);
  let visited = new Set();
  let headers = new Array(20);

  for (let i = 0; i < 20; i++) {
    for (let [colIndex, options] of matcher) {
      if (matcher.get(colIndex).size === 1) {
        headers[colIndex] = [...options][0];
        visited.add(...options);
      }
    }

    for (let [colIndex, options] of matcher) {
      matcher.set(colIndex, matcher.get(colIndex).difference(visited));
    }
  }
  // console.log("visited is", visited);
  // console.log("matcher is", matcher);
  // console.log("headers is", headers);

  // multiply headers with word departure in title
  let answer = 1;
  // console.log(myTicket);
  for (let i = 0; i < headers.length; i++) {
    let field = headers[i];
    if (field.includes("departure")) answer *= myTicket[i];
  }
  // console.log(answer);
  return answer;
};

let answer = findErrorRate(rules, nearbyTickets);
console.log(answer);
