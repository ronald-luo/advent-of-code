const fs = require("fs");

let lines = fs.readFileSync("long.txt", "utf8");
let linesArray = lines.split("\n");

// pre-process values into array
linesArray = linesArray.map((line) => {
  console.log(line.split(": "));
  let temp = line.split(": ");
  let target = Number(temp[0]);
  let vals = temp[1]
    .trim()
    .split(" ")
    .map((val) => Number(val));
  return [target, vals];
});

// create binary tree class
class TreeNode {
  constructor(val, left, right, mid) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.mid = mid === undefined ? null : mid;
  }
}

// create trinary trees
let roots = [];

for (let arr of linesArray) {
  let vals = arr[1];

  let dfs = (node, vals) => {
    if (node === null) return;
    if (vals.length <= 0) return;

    let copy = [...vals];
    let curr = copy.shift();

    if (node.left === null) {
      node.left = new TreeNode(curr);
      dfs(node.left, copy);
    }

    if (node.mid === null) {
      node.mid = new TreeNode(curr);
      dfs(node.mid, copy);
    }

    if (node.right === null) {
      node.right = new TreeNode(curr);
      dfs(node.right, copy);
    }
  };

  let head = vals.shift();
  let root = new TreeNode(head);

  dfs(root, vals);
  roots.push(root);
}

console.log(roots);

// count final sum for submission
let sum = 0;

for (let i in linesArray) {
  let root = roots[i];
  let target = linesArray[i][0];

  let ok = false;
  let dfs = (node, acc) => {
    if (!node.left && !node.right && !node.mid) {
      if (acc === target) ok = true;
      return;
    }
    if (node.left) dfs(node.left, acc + node.left.val);
    if (node.right) dfs(node.right, acc * node.right.val);
    if (node.mid) dfs(node.mid, Number(String(acc) + String(node.mid.val)));
  };

  dfs(root, root.val);
  if (ok) sum += target;
}

console.log(sum);
