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

class ListNode {
    constructor(val) {
        this.val = val
        this.next = null                
    }
}

const initialState = function () {
    let arr = cleanData()
    // console.log(arr)

    let head = initList = new ListNode(0)
    while (arr.length >= 1) {
        let val = arr.shift()
        head.next = new ListNode(val)
        head = head.next
    }
    
    return initList.next
}

let data = initialState()

const updateData = function () {

    let result = initList = new ListNode(0)
    let head = data
    while (head) {
        if (head.val === 0) {
            result.next = new ListNode(6)
            result = result.next
            result.next = new ListNode(8)
            result = result.next
        } else {
            let temp = head.val - 1
            result.next = new ListNode(temp)
            result = result.next
        }

        head = head.next
    }
    
    data = initList.next
    
}

const timeSimulation = function (days) {
    for (let i = 0; i < days; i++) {
        updateData()
    }
}

timeSimulation(80)
// timeSimulation(256) // SPACE EXCEEDED

let count = 0
while (data) {
    count += 1
    data = data.next
}

console.log(count) 