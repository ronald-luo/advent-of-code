var fs = require("fs");
var text = fs.readFileSync("small.txt", "utf-8");
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
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
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
    let scores = []
    for (let i = 0; i < arrays.length; i++) {
        let arr = evalChunk(arrays[i])
        console.log(arr)
        if (Array.isArray(arr)) {
            let score = 0
            for (let j = arr.length - 1; j >= 0; j--) {
                score = score * 5 + points[arr[j]]
            }
            scores.push(score)
        }
    }
    console.log(scores)
    scores = scores.sort((a,b) => {return a - b})
    return scores[Math.floor((scores.length / 2))]
}

console.log(main(cleanData())) // answer 2
