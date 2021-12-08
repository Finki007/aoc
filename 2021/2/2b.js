const fs = require('fs');
const cmds = fs.readFileSync('input.txt').toString().split('\n');

var horizontal = 0;
var depth = 0;
var aim = 0;

var movment = {
    up: (v) => {
        aim -= v;
    },
    down: (v) => {
        aim += v;
    },
    forward: (v) => {
        horizontal += v;
        depth += aim * v;
    }
}

for (var cmd_line of cmds) {
    var [cmd, value] = cmd_line.split(' ');
    movment[cmd](Number.parseInt(value));
}

var solution = horizontal * depth;
console.log("solution: " + solution); //2086357770