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

const cleanInstructions = function () {
    let result = []
    for (let i = 837; i < textByLine.length - 1; i++) {
        let temp = textByLine[i].split(' ')
        result.push(temp[2].split('='))
    }
    return result
}

// horizontal fold
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

// vertical fold
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

// ['0,1', '1,1'...]
// [[0,1], [1,1] ...]
const toArray = function (strings) {
    let result = []
    for (let i = 0; i < strings.length; i++) {
        let sub = strings[i].split(',')
        let arr = []
        for (let j = 0; j < sub.length; j++) {
            arr.push(Number(sub[j]))
        }
        result.push(arr)
    }
    return result
}

const main = function(coords, lines) {
    for (let i = 0; i < lines.length; i++) {
        let type = lines[i][0]
        let val = Number(lines[i][1])
        
        if (type === 'x') {
            coords = toArray(Object.keys(foldX(coords, val)))
        } else {
            coords = toArray(Object.keys(foldY(coords, val)))
        }
    }

    return coords
}

console.log(main(cleanData(), cleanInstructions()))

const visualize = function (coords) {
    let bottom = 0
    let right = 0
    for (let i = 0; i < coords.length; i++) {
        let x = coords[i][0]
        let y = coords[i][1]

        if (x >= right) {
            right = x
        }

        if (y > bottom) {
            bottom = y
        }
    }
    console.log(bottom, right)

    let arr = []

    for (let r = 0; r < bottom + 1; r++) {
        arr.push([])
        for (let c = 0; c < right + 1; c++) {
            arr[r].push(0)
        }
    }
    
    console.log(arr)

    for (let j = 0; j < coords.length; j++) {
        let x = coords[j][0]
        let y = coords[j][1]

        arr[y][x] = 1
    }

    return arr
}


console.log(visualize(main(cleanData(), cleanInstructions()))) // answer 2
