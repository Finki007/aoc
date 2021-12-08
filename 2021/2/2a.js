const fs = require('fs');
const cmds = fs.readFileSync('input.txt').toString().split('\n');

var horizontal = 0;
var depth = 0;

var movment = {
    up: (v) => {
        depth -= v;
    },
    down: (v) => {
        depth += v;
    },
    forward: (v) => {
        horizontal += v;
    }
}

for (var cmd_line of cmds) {
    var [cmd, value] = cmd_line.split(' ');
    movment[cmd](Number.parseInt(value));
}

var solution = horizontal * depth;
console.log("solution: " + solution); //2187380