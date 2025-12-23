var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function() {
    let result = []
    for (let line of textByLine) {
        result.push(line.split('').map((e) => {return Number(e)}))
    }
    return result.splice(0, result.length - 1)
}

// console.log(cleanData())

const newMap = function(matrix) {
    // copy array
    let result = matrix.slice()

    // to add new row, concat new row to index of old row
    const newRows = (function() {
        let j = 1
        while (j < 5) {
            let i = 0
            for (let row of matrix) {
                row = row.map((e) => {
                    if (e + j > 9) {
                        return (e + j) - 9
                    } else {
                        return e + j
                    }
                })
    
                result[i] = result[i].concat(row)
                i += 1
            }
            j += 1
        }
    })()

    // copy array once again
    let result_2 = result.splice()

    // to add new columns, push new rows to matrix
    const newColumns = (function() {
        let j = 0
        while (j < 5) {
            for (let row of result) {
                row = row.map((e) => {
                    if (e + j > 9) {
                        return (e + j) - 9
                    } else {
                        return e + j
                    }
                })
                result_2.push(row)
            }
            j += 1
        }
    })()

    return result_2
}

// console.log(newMap(cleanData()))

const djikstras = function(matrix) {
    let visited = {}
    let unvisited = {}

    // Fill a dictionary, unvisited with as many keys as there are values in the matrix.
    // Initialize [0, 0] as the start
    const initDataStructure = (function () {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                unvisited[[x, y]] = Number.MAX_VALUE
            }
        }

        unvisited[[0, 0]] = matrix[0][0]
    })()


    const algorithm = (function () {
        while (Object.keys(unvisited).length > 0) {
            console.log(Object.keys(unvisited).length)
            // current node, [x, y] is the key of the smallest value in unvisited {}
            let key = Object.keys(unvisited).reduce((key, v) => unvisited[v] < unvisited[key] ? v : key) // smallest key in unvisited
            let current = key.split(',').map((e) => Number(e))

            // directions: [top right botton left]
            let directions = [[current[0], current[1] - 1], [current[0] + 1, current[1]], [current[0], current[1] + 1], [current[0] - 1, current[1]]]

            // for each unvisited neighbour, calculate the distance from the start
            // if the calculated distance is less than the known distance, update the shortest path
            for (let move of directions) {
                if (move in unvisited) {
                    let newDistance = unvisited[current] + matrix[ move[1] ][ move[0] ]
                    if (newDistance < unvisited[move]) {
                        unvisited[move] = newDistance
                    }
                }
            }

            // add current node to visited
            // remove current node from unvisited
            visited[current] = unvisited[current]
            delete unvisited[current]
        }
    })()

    return visited[[matrix[0].length - 1, matrix.length - 1]] - visited[[0,0]]

}

console.log(djikstras(newMap(cleanData()))) // answer two