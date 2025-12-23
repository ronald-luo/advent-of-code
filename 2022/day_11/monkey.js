class Monkey {
    constructor() {
        this.index;
        this.items = [];
        this.operation;
        this.divBy;
        this.ifTrue;
        this.ifFalse;
        this.inspected = 0;
    }

    play(monkeys) {
        let copy = this.items.length
        for (let i = 0; i < copy; i++) {
            let old = this.items.shift();
            let tempOp = this.operation.slice(5, this.operation.length);
            let newWorry = eval(tempOp);
            // newWorry /= 3;
            // newWorry = Math.floor(newWorry);
            if (newWorry % this.divBy === 0n) {
                monkeys[this.ifTrue].items.push(newWorry);
                monkeys[this.ifTrue].inspected += 1;
            } else {
                monkeys[this.ifFalse].items.push(newWorry);
                monkeys[this.ifFalse].inspected += 1;
            }
        }
    }
}

module.exports = Monkey;