let fs = require('fs');

let data = fs.readFileSync('large.txt', 'utf-8');
let lines = data.split('\n');

let stacks = [];
let instructions = [];
let buckets = lines[0].length / 4;
let answer = '';

for (let i = 0; i < buckets; i++) {
    stacks.push([]);
}

let i = 0
for (let line of lines) {
    if (line === '\r' || line === '') {
        break;
    };
    for (let i = 0; i < buckets; i++) {
        let item = line.slice(i*4, i*4 + 4);
        item = item.trim();

        if (item != '' && item != '\r') {
            stacks[i].unshift(item);
        };
    };
    i++
};

stacks = stacks.map((stack) => {
    return stack.slice(1)
});

for (i += 1; i < lines.length; i++) {
    lines[i] = lines[i].split(' ').filter((item) => {
        return !isNaN(item);
    });
    
    let quantity = lines[i][0];
    let start = lines[i][1];
    let destination = lines[i][2];

    instructions.push([Number(quantity), Number(start), Number(destination)]);
};

function readInstructions(instructions, stacks) {
    for (let instruction of instructions) {
        for (let i = 0; i < instruction[0]; i++) {
            let temp = stacks[instruction[1] - 1].pop();
            stacks[instruction[2] - 1].push(temp);

        };
    };
};

readInstructions(instructions, stacks);

stacks.map((node) => {
    let temp = node[node.length - 1];
    if (temp != undefined) {
        answer += temp;
    }
});

console.log(answer);