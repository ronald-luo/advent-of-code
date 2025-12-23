var fs = require("fs");
var text = fs.readFileSync("small.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function() {
    let result = []
    for (let line of textByLine) {
        result.push(line.split('').map((e) => {return Number(e)}))
    }
    return result.splice(0, result.length - 1)
}

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

console.log(djikstras(cleanData())) // answer one