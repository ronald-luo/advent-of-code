var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function () {
    let result = []
    for (let i = 0; i < textByLine.length - 1; i++) {
        let temp = textByLine[i].split('')
        let arr = []
        for (let j = 0; j < temp.length; j++) {
            arr.push(Number(temp[j]))
        }
        result.push(arr)    
    }
    return result
}

console.log(cleanData()[0])

const main = function(matrix) {
    let sum = 0
    let up;
    let right;
    let left;
    let down;
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            try {
                up = matrix[r - 1][c]
            } catch {
                up = Number.MAX_VALUE
            }
            try {
                left = matrix[r][c - 1]
            } catch {
                left = Number.MAX_VALUE
            }
            try {
                down = matrix[r + 1][c]
            } catch {
                down = Number.MAX_VALUE
            }
            try {
                right = matrix[r][c + 1]
            } catch {
                right = Number.MAX_VALUE
            }
            
            if (right === undefined) {
                right = Number.MAX_VALUE
            }
            if (up === undefined) {
                up = Number.MAX_VALUE
            }
            if (left === undefined) {
                left = Number.MAX_VALUE
            }
            if (down === undefined) {
                down = Number.MAX_VALUE
            }

            if (matrix[r][c] < up) {
                if (matrix[r][c] < right) {
                    if (matrix[r][c] < down) {
                        if (matrix[r][c] < left) {
                            sum += matrix[r][c] + 1
                        }
                    }
                }
            }

        }
    }
    console.log(sum)
    return sum
}

main(cleanData())