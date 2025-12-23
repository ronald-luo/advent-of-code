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

// Try: Iterative method -> DOES NOT WORK
let data = cleanData()

const updateDataIter = function () {

    let nextFish = []

    for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) {
            // if the current timer is 0, reset the timer to 6
            // add a new timer set to 8 for the next iteration
            nextFish.push(6)
            nextFish.push(8)
        } else {
            // if the current timer is 0 < t < 9
            // subtract 1 and add to the next iteration
            nextFish.push(data[i] - 1)
        }
    }

    data = nextFish
}

const timeSimulation = function(days) {
    for (let i = 0; i < days; i++) {
        updateDataIter()
    }
}
timeSimulation(80)
console.log(data.length)

// timeSimulation(256)
// console.log(data.length)  // SPACE EXCEED