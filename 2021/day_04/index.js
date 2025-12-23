var fs = require("fs");
const { resourceLimits } = require("worker_threads");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

// add winnings to dictionary

// creates matrix 5 x 5
let result = []
let arr = []
for (let i = 1; i < 50; i++) {
    if (textByLine[i] === '') {
        continue
    } else if (arr.length < 5) {

        let temp = textByLine[i].split(' ')
        temp = temp.filter(entry => /\S/.test(entry)); // get rid of no value
        arr.push(temp)
        
    } else if (arr.length === 5) {
        result.push(arr)
        arr = []
    }
}

console.log(result)
console.log(result[0])
console.log(result[0][1])
console.log(result[1][2])


for (let i = 0; i < result.length; i++) {
    console.log(result[i])
}

function bingo(matrix) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {

        }
    }
}