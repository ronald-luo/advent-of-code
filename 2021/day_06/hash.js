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

// console.log(cleanData()) // data is cleaned :D

const hash = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0, 
    7: 0,
    8: 0,
 }

let data = cleanData()

const updateData = function () {
    for (let i = 0; i < data.length; i++) {
        if (data[i] in hash) {
            hash[data[i]] += 1
        }
    }
}

updateData()

const timeSimulation = function(days) {
    for (let i = 0; i < days; i++) {
        let temp = hash[0]
        hash[0] = hash[1]
        hash[1] = hash[2]
        hash[2] = hash[3]
        hash[3] = hash[4]
        hash[4] = hash[5]
        hash[5] = hash[6]
        hash[6] = hash[7] + temp
        hash[7] = hash[8]
        hash[8] = temp
    }
}

timeSimulation(256)

let result = Object.values(hash)

let counter = 0
for (let i = 0; i < result.length; i++) {
    counter += result[i]
}

console.log(counter) // answer 2
