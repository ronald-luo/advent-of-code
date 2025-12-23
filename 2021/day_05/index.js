var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

console.log(textByLine)
let coordinates = {}

for (let i = 0; i < textByLine.length - 1; i++) {
    let temp = textByLine[i].split(' ')

    // x coordinate are equal
    // console.log(temp[0].split(',')[0])
    // console.log(temp[2].split(',')[0])
    if (Number(temp[0].split(',')[0]) === Number(temp[2].split(',')[0])) {
        // console.log('x same')
        // console.log(temp[0].split(','))
        // console.log(temp[2].split(','))
        let constant = Number(temp[0].split(',')[0])
        let smaller = Math.min(Number(temp[0].split(',')[1]), Number(temp[2].split(',')[1]))
        let greater = Math.max(Number(temp[0].split(',')[1]), Number(temp[2].split(',')[1]))

        for (let i = smaller; i <= greater; i++) {

            if (`${constant}, ${i}` in coordinates) {
                // console.log('this is working')
                coordinates[`${constant}, ${i}`] += 1
            } else {
                coordinates[`${constant}, ${i}`] = 1            
            }
        }
    }

    // y coordinate are equal
    // console.log(temp[0].split(',')[1])
    // console.log(temp[2].split(',')[1])
    if (Number(temp[0].split(',')[1]) === Number(temp[2].split(',')[1])) {
        // console.log('y same')
        // console.log(temp[0].split(','))
        // console.log(temp[2].split(','))
        let constant = temp[0].split(',')[1]
        let smaller = Math.min(Number(temp[0].split(',')[0]), Number(temp[2].split(',')[0]))
        let greater = Math.max(Number(temp[0].split(',')[0]), Number(temp[2].split(',')[0]))
        

        for (let i = smaller; i <= greater; i++) {

            if (`${i}, ${constant}` in coordinates) {
                // console.log('this is working')
                coordinates[`${i}, ${constant}`] += 1
            } else {
                coordinates[`${i}, ${constant}`] = 1
            }
        }
    }


    // check y2 - y1 / x2 - x1 === 1
    // add coordinates
    let slope = (Number(temp[2].split(',')[1]) - Number(temp[0].split(',')[1])) / (Number(temp[2].split(',')[0]) - Number(temp[0].split(',')[0]))
    if (slope === 1) {
        // console.log('diagonal line')
        // console.log(temp[0].split(','))
        // console.log(temp[2].split(','))
        
        // smallest x value
        if (Number(temp[0].split(',')[0]) <= Number(temp[2].split(',')[0])) {

            let n = 0
            let k = Number(temp[2].split(',')[0]) - Number(temp[0].split(',')[0])
            while (n <= k) {
                if (`${Number(temp[0].split(',')[0]) + n}, ${Number(temp[0].split(',')[1]) + n}` in coordinates) {
                    coordinates[`${Number(temp[0].split(',')[0]) + n}, ${Number(temp[0].split(',')[1]) + n}`] += 1
                } else {
                    coordinates[`${Number(temp[0].split(',')[0]) + n}, ${Number(temp[0].split(',')[1]) + n}`] = 1
                }

                n += 1
            }

        } else {

            let n = 0
            let k = Number(temp[0].split(',')[0]) - Number(temp[2].split(',')[0])
            while (n <= k) {
                let k = temp[2].split(',')[0] - temp[0].split(',')[0]
                if (`${Number(temp[2].split(',')[0]) + n}, ${Number(temp[2].split(',')[1]) + n}` in coordinates) {
                    coordinates[`${Number(temp[2].split(',')[0]) + n}, ${Number(temp[2].split(',')[1]) + n}`] += 1
                } else {
                    coordinates[`${Number(temp[2].split(',')[0]) + n}, ${Number(temp[2].split(',')[1]) + n}`] = 1
                }

                n += 1
            }

        }

    }

    // let slope = (Number(temp[2].split(',')[1]) - Number(temp[0].split(',')[1])) / (Number(temp[2].split(',')[0]) - Number(temp[0].split(',')[0]))
    if (slope === -1) {
        console.log('diagonal line')
        console.log(temp[0].split(','))
        console.log(temp[2].split(','))
        
        // smallest x value
        if (Number(temp[0].split(',')[0]) <= Number(temp[2].split(',')[0])) {

            let n = 0
            let k = Number(temp[2].split(',')[0]) - Number(temp[0].split(',')[0])
            while (n <= k) {
                if (`${Number(temp[0].split(',')[0]) + n}, ${Number(temp[0].split(',')[1]) - n}` in coordinates) {
                    coordinates[`${Number(temp[0].split(',')[0]) + n}, ${Number(temp[0].split(',')[1]) - n}`] += 1
                } else {
                    coordinates[`${Number(temp[0].split(',')[0]) + n}, ${Number(temp[0].split(',')[1]) - n}`] = 1
                }

                n += 1
            }

        } else {
            
            let n = 0
            let k = Number(temp[0].split(',')[0]) - Number(temp[2].split(',')[0])
            while (n <= k) {
                let k = temp[2].split(',')[0] - temp[0].split(',')[0]
                if (`${Number(temp[2].split(',')[0]) + n}, ${Number(temp[2].split(',')[1]) - n}` in coordinates) {
                    coordinates[`${Number(temp[2].split(',')[0]) + n}, ${Number(temp[2].split(',')[1]) - n}`] += 1
                } else {
                    coordinates[`${Number(temp[2].split(',')[0]) + n}, ${Number(temp[2].split(',')[1]) - n}`] = 1
                }

                n += 1
            }

        }

    }

}

console.log(coordinates)

let values = Object.values(coordinates)

console.log(values)

let answer = 0
for (let i = 0; i < values.length; i++) {
    if (values[i] > 1) {
        answer += 1
    }
}


console.log(answer)