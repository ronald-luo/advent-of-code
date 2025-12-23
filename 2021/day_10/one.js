var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function () {
    let result = []
    for (let i = 0; i < textByLine.length - 1; i++) {
        let arr = textByLine[i].split('')
        result.push(arr.splice(0, arr.length - 1))
    }
    return result
}

const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

let hash = {
    ')':'(',
    ']':'[',
    '}':'{',
    '>':'<',
}

let openings = {
    '(':')',
    '[':']',
    '{':'}',
    '<':'>',
}

const evalChunk = function (arr) {
    let stack = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] in openings) {
            stack.push(arr[i])
        } else {
            if (stack[stack.length - 1] === hash[arr[i]]) {
                stack.pop()
            } else {
                return arr[i]
            }
        }
    }
    return stack
}

const main = function (arrays) {
    let count = 0
    for (let i = 0; i < arrays.length; i++) {
        if (evalChunk(arrays[i]) in hash) {
            count += points[evalChunk(arrays[i])]
        }
    }
    return count
}

console.log(main(cleanData())) // answer 1