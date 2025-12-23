var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

// returns hash and arr of original input
const cleanData = function () {
    let hash = {}
    let start;
    for (let i = 0; i < textByLine.length - 1; i++) {
        let temp = textByLine[i].split(' ')

        if (temp.length === 1) {
            if (temp[0].trim().length > 0) {
                start = temp[0].trim()
                start = start.split('')
            }
        } else {
            let pair = temp[0].trim()
            let insert = temp[2].trim()
            hash[pair] = insert
        }

    }
    return [hash, start]
}

let hash = cleanData()[0] // {CH: B, HH: N ...}
let arr = cleanData()[1] // ['N', 'N', 'C', 'B']

// takes hash and arr as input and spits out new arr
const step = function (hash, arr) {
    let pairs = [] // ['NN', 'NC','CB']
    for (let i = 1; i < arr.length; i++) {
        let pair = arr.slice(i - 1, i + 1).join('') 
        pairs.push(pair)
    }
    
    let result = ''
    for (let j = 0; j < pairs.length; j++) {
        if (pairs[j] in hash) {
            let temp = pairs[j].split('')
            temp.splice(1,0, hash[pairs[j]])
            if (j === pairs.length - 1) {
                result += temp.join('')
            } else {
                result += temp.join('').slice(0, 2)
            }
        }
    }
    return result.split('')
}

let main = function (steps) {
    let freq = {}

    for (let i = 0; i < steps; i++) {
        arr = step(hash, arr)
    }

    for (let j = 0; j < arr.length; j++) {
        if (arr[j] in freq) {
            freq[arr[j]] += 1
        } else {
            freq[arr[j]] = 1
        }
    }

    let vals = Object.values(freq)
    return Math.max(...vals) - Math.min(...vals)
}

console.log(main(10)) // answer one