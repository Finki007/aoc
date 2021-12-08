const fs = require('fs'),
readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    console: false
});

var gamma_rate_bin = '';
var epsilon_rate_bin = '';

var sum = [];
var binaries = [];
var total = 0;

rd.on('line', (line) => {
    for (let i in line) {
        if (!sum[i])
            sum[i] = 0;
        sum[i] += Number.parseInt(line[i]);
    }
    binaries.push(line);
    total++;
});

rd.on('close', () => {
    for (var s of sum) {
        gamma_rate_bin += (s > total/2 ? '1' : '0');
        epsilon_rate_bin += (s < total/2 ? '1' : '0');
    }

    let keys = [ 'O2', 'CO2' ];

    let lists = {
        O2: binaries,
        CO2: binaries
    };

    let bins = {
        O2: gamma_rate_bin,
        CO2: epsilon_rate_bin
    };

    let sums = {
        O2: sum,
        CO2: sum
    };

    let comp_function = {
        O2: (_1,_0) => {
            return _1 === Math.max(_1,_0) ? '1' : '0'
        },
        CO2: (_1,_0) => {
            return _0 === Math.min(_1,_0) ? '0' : '1'
        }
    };

    for (var k of keys) {
        for (let i in sum) {
            if (lists[k].length > 1)
                lists[k] = lists[k].filter(v => v[i] === bins[k][i]);

            sums[k] = lists[k].reduce((prev, curr) => {
                for (let c in curr) {
                    if (!prev[c])
                        prev[c] = [0,0]
                    prev[c][0] += (Number.parseInt(curr[c]) + 1) % 2;
                    prev[c][1] += Number.parseInt(curr[c]);
                }
                return prev;
            }, []);

            bins[k] = '';

            for (var _s of sums[k]) {
                bins[k] += comp_function[k](_s[1], _s[0]);
            }
        }
    }

    gamma_rate = Number.parseInt(gamma_rate_bin, 2);
    epsilon_rate = Number.parseInt(epsilon_rate_bin, 2);

    oxygen_generator_rating = Number.parseInt(lists.O2[0], 2);
    CO2_scrubber_rating = Number.parseInt(lists.CO2[0], 2);

    var solution = oxygen_generator_rating * CO2_scrubber_rating;
    console.log("solution: " + solution); //1877139
})
