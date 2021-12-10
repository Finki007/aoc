const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').map(v => {
    let [cmd,value] = v.split(' ');
    return [cmd,Number.parseInt(value)]
});

var horizontal = 0;
var depth = 0;
var aim = 0;

const movment1 = {
    up: (v) => depth -= v,
    down: (v) => depth += v,
    forward: (v) => horizontal += v
}
const movment2 = {
    up: (v) => aim -= v,
    down: (v) => aim += v,
    forward: (v) => { horizontal += v; depth += aim * v; }
}

for (var cmd of input) {
    movment1[cmd[0]](cmd[1]);
}
const part1 = horizontal * depth;

aim = horizontal = depth = 0;
for (var cmd of input) {
    movment2[cmd[0]](cmd[1]);
}
const part2 = horizontal * depth;

console.log("solution: " + part1);
// solution: 2187380
console.log("solution: " + part2);
// solution: 2086357770