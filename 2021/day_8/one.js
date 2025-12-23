var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function () {
    let results = []
    for (let i = 0; i < textByLine.length - 1; i++) {
        let temp = textByLine[i].split(' ')
        let last = temp.pop().trim()
        temp = temp.concat(last)
        results.push(temp)
    }
    return results
}

cleanData()

const getNums = function(notes) {
    let count = 0;
    for (let i = 0; i < notes.length; i++) {
        let output = notes[i].slice(11,15)
        for (let j = 0; j < output.length; j++) {
            if (output[j].length === 2 || output[j].length === 4 || output[j].length === 3 || output[j].length === 7) {
                count += 1
            }
        }
    }
    return count
}

console.log(getNums(cleanData())) // answer one