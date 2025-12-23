var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function () {
    let result = []

    for (let i = 0; i < textByLine.length - 1; i++) {
        let arr = textByLine[i].split('')
        let temp = []
        for (let j = 0; j < arr.length; j++) {
            temp.push(Number(arr[j]))
        }
        result.push(temp)
    }
    return result
}

const bfs = function(x, y, seen, matrix) {
    if (!([x, y] in seen)) {
        if (0 <= x && x < matrix[0].length && 0 <= y && y < matrix.length) {
            matrix[y][x] += 1
            if (matrix[y][x] === 10) {
                bfs(x - 1, y - 1, seen.concat([x, y]), matrix)
                bfs(x, y - 1, seen.concat([x, y]), matrix)
                bfs(x + 1, y - 1, seen.concat([x, y]), matrix)

                bfs(x - 1, y, seen.concat([x, y]), matrix)
                bfs(x + 1, y, seen.concat([x, y]), matrix)

                bfs(x - 1, y + 1, seen.concat([x, y]), matrix)
                bfs(x, y + 1, seen.concat([x, y]), matrix)
                bfs(x + 1, y + 1, seen.concat([x, y]), matrix)
            }
        }
    }
}

const allZero = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}

const main = function(matrix) {
    let step = 0
    while (!allZero(matrix)) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                bfs(j, i, [], matrix)
            }
        }
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (matrix[j][i] > 9) {
                    matrix[j][i] = 0
                }
            }
        }
        step += 1
    }
    return step
}

console.log(main(cleanData())) // answer 2