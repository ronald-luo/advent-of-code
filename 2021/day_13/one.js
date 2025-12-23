var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function () {
    let result = []
    for (let i = 0; i < textByLine.length; i++) {
        let temp = textByLine[i].split(',')
        let arr = []
        for (let j = 0; j < temp.length; j++) {
            arr.push(Number(temp[j]))
        }
        result.push(arr)
    }

    for (let a = 0; a < result.length; a++) {
        if (result[a].length === 1) {
            return result.splice(0, a)
        }
    }
}

const foldY = function (coords, line) {
    let hash = {}

    for (let i = 0; i < coords.length; i++) {
        let x = coords[i][0]
        let y = coords[i][1]
        let arr = []
        if (y > line) {
            arr.push(x)
            arr.push(2 * line - y)
        } else {
            arr.push(x)
            arr.push(y)
        }

        if (arr in hash) {
            hash[arr] += 1
        } else {
            hash[arr] = 0
        }
    }

    return hash

}

const foldX = function (coords, line) {
    let hash = {}

    for (let i = 0; i < coords.length; i++) {
        let x = coords[i][0]
        let y = coords[i][1]
        let arr = []
        if (x > line) {
            arr.push(2 * line - x)
            arr.push(y)
        } else {
            arr.push(x)
            arr.push(y)
        }

        if (arr in hash) {
            hash[arr] += 1
        } else {
            hash[arr] = 0
        }
    }

    return hash

}

console.log(Object.values(foldX(cleanData(), 655)).length) // answer 1