var fs = require("fs");
var text = fs.readFileSync("input.txt", "utf-8");
var textByLine = text.split("\n")

const cleanData = function () {
    let results = []
    for (let i = 0; i < textByLine.length - 1; i++) {
        let temp = textByLine[i].split(' ')
        let last = temp.pop().trim()
        temp = temp.concat(last)
        results.push(temp)
    }
    return results
}

function difference(first, second) {
    return [
        ...first.filter(x => !second.includes(x)),
        ...second.filter(x => !first.includes(x))
    ];
}

const decryptNums = function(arr) {
    let hash = {}

    const findBasic = (function () {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length === 2) {
                hash[1] = arr[i]
            }
            if (arr[i].length === 3) {
                hash[7] = arr[i]
            }
            if (arr[i].length === 4) {
                hash[4] = arr[i]
            }
            if (arr[i].length === 7) {
                hash[8] = arr[i]
            }
        }
    })()

    const fiveLines = (function () {
        let fives = arr.filter((code) => code.length === 5)

        const getThree = (() => {
            let one = hash[1].split('')
            for (let i = 0; i < fives.length; i++) {
                if (one.every(e => fives[i].split('').includes(e))) {
                    hash[3] = fives[i]
                    fives.splice(i, 1)
                }
            }
        })();
        
        const getFive = (() => {
            let diff = difference(hash[4].split(''), hash[1].split(''))
            for (let i = 0; i < fives.length; i++) {
                if (diff.every(e => fives[i].split('').includes(e))) {
                    hash[5] = fives[i]
                    fives.splice(i, 1)
                }
            }
        })();

        const getTwo = (() => {
            hash[2] = fives[0]
            fives.splice(0, 1)
        })()
    })()

    const sixLines = (function () {
        let sixes = arr.filter((code) => code.length === 6)

        const getNine = (() => {
            let four = hash[4].split('')
            for (let i = 0; i < sixes.length; i++) {
                if (four.every(e => sixes[i].split('').includes(e))) {
                    hash[9] = sixes[i]
                    sixes.splice(i, 1)
                }
            }
        })()

       const getZero = (() => {
            let one = hash[1].split('')
            for (let i = 0; i < sixes.length; i++) {
                if (one.every(e => sixes[i].split('').includes(e))) {
                    hash[0] = sixes[i]
                    sixes.splice(i, 1)
                }
            }
       })()
       
       const getSix = (() => {
            hash[6] = sixes[0]
            sixes.splice(0, 1)
        })()

    })()

    return Object.assign({}, ...Object.entries(hash).map(([a,b]) => ({ [b]: a })))
}

const arePermutations = function (arr1, arr2) {

    if (arr1.length != arr2.length)
        return false;

    let hM = new Map();

    for (let i = 0; i < arr1.length; i++)
    {
        let x = arr1[i];
        if (!hM.has(x))
            hM.set(x, 1);
        else
        {
            let k = hM[x];
            hM.set(x, k+1);
        }
    }

    for (let i = 0; i < arr2.length; i++)
    {
        let x = arr2[i];

        if (!hM.has(x) || hM[x] == 0)
            return false;

        let k = hM[x];
        hM.set(x, k-1);
    }
    return true;
}

const main = function(notes) {
    let count = 0
    for (let i = 0; i < notes.length; i++) {
        let input = notes[i].slice(0,10)
        let hash = decryptNums(input)
        let output = notes[i].slice(11,15)
        let str = ''
        let keys = Object.keys(hash)
        for (let j = 0; j < output.length; j++) {

            for (let n = 0; n < keys.length; n++) {
                if (arePermutations(output[j].split(''), keys[n].split(''))) {
                    str += `${hash[keys[n]]}`
                }
            }
        }

        count += Number(str)
    }
    return count
}

console.log(main(cleanData())) // answer two