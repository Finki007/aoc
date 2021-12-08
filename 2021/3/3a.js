const fs = require('fs'),
readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    console: false
});

var gamma_rate_bin = '';
var epsilon_rate_bin = '';

var sums = [];
var total = 0;

rd.on('line', (line) => {
    for (var i in line) {
        if (!sums[i])
            sums[i] = 0;
        sums[i] += Number.parseInt(line[i]);
    }
    total++;
}); 

rd.on('close', () => {
    for (var sum of sums) {
        gamma_rate_bin += (sum > total/2 ? '1' : '0');
        epsilon_rate_bin += (sum < total/2 ? '1' : '0');
    }

    gamma_rate = Number.parseInt(gamma_rate_bin, 2);
    epsilon_rate = Number.parseInt(epsilon_rate_bin, 2);

    var solution = gamma_rate * epsilon_rate;
    console.log("solution: " + solution); //2003336
})
