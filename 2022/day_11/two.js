const fs = require('fs');
const Monkey = require('./monkey.js');
const filePath = './small.txt';

function createMonkeys() {
   let monkeys = [new Monkey()];
   let i = 0;

   try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const lines = fileContent.split('\n');

      for (let line of lines) {
         line = line.trim();
   
         if (line.includes('Monkey')) {
            let index = line.match(/\d+(\.\d+)?/)[0];
            monkeys[i].index = Number(index);
         };
   
         if (line.includes('Starting items')) {
            let startingItems = line.slice(16, line.length).split(',');
            startingItems = startingItems.map((num) => BigInt(num));
            monkeys[i].items = startingItems;
            monkeys[i].inspected = startingItems.length;
         };
   
         if (line.includes('Operation')) {
            let operation = line.slice(11, line.length)
            let tempArray = operation.split(' ')

            if (tempArray[4].match(/\d+(\.\d+)?/)) {
                tempArray[4] = `BigInt(${tempArray[4]})`
                monkeys[i].operation = tempArray.join(' ');
            } else {
                monkeys[i].operation = operation;
            }
         };
   
         if (line.includes('Test')) {
            let divBy = line.match(/\d+(\.\d+)?/)[0];
            monkeys[i].divBy = BigInt(divBy);
         };
   
         if (line.includes('If')) {
            let toMonkey = line.match(/\d+(\.\d+)?/)[0];
            if (line.includes('true')) {
               monkeys[i].ifTrue = BigInt(toMonkey);
            }
            if (line.includes('false')) {
               monkeys[i].ifFalse = BigInt(toMonkey);
            }
         };
   
         if (line === '') {
            monkeys.push(new Monkey())
            i += 1;
         };
      };
   }
   catch (err) {
      console.error('Error reading the file:', err);
   };

   return monkeys.slice(0, monkeys.length - 1);
}

let monkeys = createMonkeys();

for (let i = 0; i < 10000; i++) {
   for (let monkey of monkeys) {
      monkey.play(monkeys);
   }
}


for (let monkey of monkeys) {
   console.log(monkey.inspected - monkey.items.length)
}


// console.log(monkeys)