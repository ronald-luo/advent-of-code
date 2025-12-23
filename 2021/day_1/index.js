var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

let counter = 0
for (let i = 1; i < textByLine.length; i++) {
    if (textByLine[i] - textByLine[i - 1] > 0) {
        counter += 1
    }
}

console.log(counter)

let sumCounter = 0
let prevSum = Number(textByLine[0]) + Number(textByLine[1]) + Number(textByLine[2])
for (let i = 3; i < textByLine.length; i++) {

    let currSum = Number(textByLine[i]) + Number(textByLine[i - 1]) + Number(textByLine[i - 2])

    if (currSum > prevSum) {
        sumCounter += 1
    }

    prevSum = currSum
}

console.log(sumCounter)