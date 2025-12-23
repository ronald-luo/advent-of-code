var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

console.log(textByLine)

let x = 0
let y = 0
for (let i = 0; i < textByLine.length; i++) {
    let direction = textByLine[i].split(' ')[0]
    let magnitude = textByLine[i].split(' ')[1]

    if (direction === "forward") {
        x += Number(magnitude)
    } else if (direction === "down") {
        y += Number(magnitude)
    } else if (direction === "up") {
        y -= Number(magnitude)
    }
}

console.log(x * y) // answer 1

x = 0
y = 0
let aim = 0
for (let i = 0; i < textByLine.length; i++) {
    let direction = textByLine[i].split(' ')[0]
    let magnitude = textByLine[i].split(' ')[1]

    if (direction === "forward") {
        x += Number(magnitude)
        y += aim * Number(magnitude)
    } else if (direction === "down") {
        aim += Number(magnitude)
    } else if (direction === "up") {
        aim -= Number(magnitude)
    }
}

console.log(x)
console.log(y)

console.log(x * y) // answer 2