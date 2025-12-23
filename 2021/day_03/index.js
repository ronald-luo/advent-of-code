
var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")


function toDecimal(binary) {

    let powerTable = []
    result = 0

    for (let i = binary.length - 1; i >= 0; i--) {
        powerTable.push(2**i)
    }

    for (let j = 0; j < binary.length; j++) {
        result += powerTable[j] * binary[j]
    }

    return result
}

let gamma = "";
let epsilon = "";
let start = 0;

while (start <= textByLine[0].length - 1) {


    let counter = 0
    for (let i = 0; i < textByLine.length; i++) {

        let current = textByLine[i][start]

        if (current === "1") {
            counter += 1
        } else {
            counter -= 1
        }
    }
    
    if (counter > 0) {
        gamma += "0"
        epsilon += "1"
    } else {
        gamma += "1"
        epsilon += "0"
    }
    
    start += 1
}

console.log(gamma, epsilon)

 function hunter(arr, curr) {
    let counter = 0

    for (let i = 0; i < arr.length; i++) {

        let current = arr[i][curr]

        if (current === "1") {
            counter += 1
        } else {
            counter -= 1
        }
    }

    if (counter > 0) {
        return "1"
    } else if (counter === 0) {
        return "1"
    } else {
        return "0"
    }
}


function gatherer(arr, majority, curr) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][curr] === majority) {
            result.push(arr[i])
        }
    }
    
    return result
}

function helper(arr, curr) {
    // console.log(curr)

    if (arr.length === 1) {
        console.log(arr)
        console.log(toDecimal(arr[0]))
    } else {
        // console.log(arr)
        arr = gatherer(arr, hunter(arr, curr), curr)
        helper(arr, curr + 1)
    }
}

helper(textByLine, 0)



function hunterco2(arr, curr) {
    let counter = 0

    for (let i = 0; i < arr.length; i++) {

        let current = arr[i][curr]

        if (current === "1") {
            counter += 1
        } else {
            counter -= 1
        }
    }

    if (counter > 0) {
        return "0"
    } else if (counter === 0) {
        return "0"
    } else {
        return "1"
    }
}

function gathererco2(arr, majority, curr) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][curr] === majority) {
            result.push(arr[i])
        }
    }
    
    return result
}

function helperco2(arr, curr) {
    // console.log(curr)

    if (arr.length === 1) {
        console.log(arr)
        console.log(toDecimal(arr[0]))
    } else {
        // console.log(arr)
        arr = gathererco2(arr, hunterco2(arr,curr), curr)
        helperco2(arr, curr + 1)
    }
}

helperco2(textByLine, 0)
