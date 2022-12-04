const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').map(Number);

const part1 = input.filter((v,i) => v > input[i-1]).length;

let sum_3 = input.reduce((p,c,i) => {
    if (i > 1)
        p.push( input.slice(i-2,i+1).reduce((p, c) => p += c, 0));
    return p;
}, [])

const part2 = sum_3.filter((v,i) => v > sum_3[i-1]).length;

console.log("solution: " + part1);
// solution: 1167
console.log("solution: " + part2);
// solution: 1130
