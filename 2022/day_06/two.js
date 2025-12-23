let fs = require('fs');

let data = fs.readFileSync('large.txt', 'utf-8');

let i = 0;
let j = 14;

while (j <= data.length) {
    let temp = new Set(data.slice(i, j).split(''));

    if (temp.size === 14) {
        console.log(j)
        break
    }

    i += 1
    j += 1
};