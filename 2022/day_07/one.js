let fs = require('fs');

function readData() {
    let data = fs.readFileSync('large.txt', 'utf-8');
    let lines = data.split('\n');
    let directory = [];
    let temp = [];
    for (let line of lines) {
        if (/\$/.test(line)) {
            if (line[2] === 'c' && line[5] != '.') {
                directory.push(temp);
            }
            else if (line[2] === 'l') {
                temp = [];
            };
        } else {
            temp.push(line.trim());
        };
    };
    directory.push(temp);
    return directory.slice(1);
};

function createStructure(directory, i) {
    let result = new Map();
    for (let file of directory[i]) {
        let temp = file.split(' ')
        let fileSize = temp[0];
        let fileName = temp[1];

        if (fileSize === 'dir') {
            result.set(fileName, new Map());
        } else {
            result.set(fileName, Number(fileSize));
        }
    }
    return result;
};

function recurseDirectory(directory, result) {
    if (directory.length === 0) {
        return result;
    }
    for (let key of result.keys()) {
        if (result.get(key).size === 0) {
            let temp = directory[0];
            directory.shift(); 
            result.set(key, recurseDirectory(directory, temp));
        };
    };
    return result;
};

function flattenDirectorySizes(directorySizes) {
    let result = [];

    function traverseDirectorySizes(entries) {
        let directorySize = 0;
        for (let [key, value] of entries) {
            if (value instanceof Map) {
                directorySize += traverseDirectorySizes(value);
            } else {
                directorySize += value;
            }
        }
        result.push(directorySize);
        return directorySize;
    }

    traverseDirectorySizes(directorySizes);
    return result;
}

function main() {
    let directory = readData();
    for (let i = 0; i < directory.length; i++) {
        directory[i] = createStructure(directory, i);
    };
    let dict = recurseDirectory(directory, directory.shift());

    let result = flattenDirectorySizes(dict)
    console.log(result.reduce((acc, curr) => curr < 100000 ? acc + curr : acc, 0));
};

main();