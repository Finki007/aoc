const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

var last = null;
var output = null;

for (var i of input) {
    var line = "";
    if (!last) {
        line = i + " (N/A - no previous measurement)";
    } else {
        if (output)
            output += "\n";
        
        line = `${last} (${i > last ? "increased" : "decreased"})`;
    }
    last = Number.parseInt(i);
    output += line;
}

var solution = output.match(/increased/g).length;
console.log("solution: " + solution); //1167