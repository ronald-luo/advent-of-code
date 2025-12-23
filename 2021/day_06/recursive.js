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

console.log(cleanData()) // data is cleaned :D

// input the current fish values
// return the number of fish values after x days
const updateData = function (fish, days) {

    if (days < 1) {
        return fish.length
    } else {
        let nextFish = []
    
        for (let i = 0; i < fish.length; i++) {
            if (fish[i] === 0) {
                // if the current timer is 0, reset the timer to 6
                // add a new timer set to 8 for the next iteration
                nextFish.push(6)
                nextFish.push(8)
            } else {
                // if the current timer is 0 < t < 9
                // subtract 1 and add to the next iteration
                nextFish.push(fish[i] - 1)
            }
        }

        return updateData(nextFish, days - 1)
    }
}

let answer_one = updateData(cleanData(), 80)
console.log(answer_one) // answer 1

// let answer_two = updateData(cleanData(), 256)
// console.log(answer_two) // answer 2 SPACE EXCEEDED