const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

var last = [];
var output = "";

const sum_A = (arr) => {
    var A = arr.slice(0, 3);
    return A.reduce((p, c) => p + c, 0);
}
const sum_B = (arr) => {
    var B = arr.slice(1, 4);
    return B.reduce((p, c) => p + c, 0);
}
const in_de = (arr) => {
    return sum_B(arr) > sum_A(arr);
}

for (var i of input) {
    var line = "";
    if (last.length < 2) {
        last.push(Number.parseInt(i));
        continue;
    } else if (last.length < 3) {
        last.push(Number.parseInt(i));
        var sum = sum_A(last);
        line = sum + " (N/A - no previous sum)";
    } else {
        if (output !== "")
            output += "\n";
        last.push(Number.parseInt(i));
        line = `${sum_B(last)} (${in_de(last) ? "increased" : "decreased"})`;
        last = last.slice(1, last.length)
    }
    output += line;
}
console.log("solution: " + output.match(/increased/g).length); //1130