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