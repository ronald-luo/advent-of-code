var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

// input raw data
// return a list of numbers, fish, to be used in updataData
const cleanData = function () {
    let fish = textByLine[0].split(',')
    let result = []
    
    for (let i = 0; i < fish.length; i++) {
        result.push(Number(fish[i]))
    }
    
    return result
}

// O(n**2) find the distance of every point against every other point
// put all distances in an array and get the smallest
const getSmallest = function () {
    let data = cleanData()

    let distances = []
    for (let i = 0; i < data.length; i++) {
        let score = 0
        for (let j = 0; j < data.length; j++) {
            score += Math.abs(data[i] - data[j])
        }
        distances.push(score)
    }
    
    let smallest = Math.min(...distances)
    return smallest
}

console.log(getSmallest()) // answer 1

const crabEngineering = function() {

    // Triangle Sequence: 1 + 2 + 3 + 4.. n
    // Input: distance | Output: cumulative steps
    const triangleSequence = function(distance) {
        return distance*(distance + 1)/2
    }

    let data = cleanData()
    let maxRange = Math.max(...data)
    let minRange = Math.min(...data)
    let range = maxRange - minRange
    let weights = []

    for (let i = 0; i <= range; i++) {
        weights.push(0)
    }

    for (let m = 0; m < weights.length; m++) {
        let sum = 0
        for (let n = 0; n < data.length; n++) {
            let distance = Math.abs(data[n] - m)
            sum += triangleSequence(distance)
        }
        weights[m] += sum
    }

    return Math.min(...weights)
}

console.log(crabEngineering()); // answer 2
