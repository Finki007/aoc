const fs = require('fs');
const raw_input = fs.readFileSync('input.txt').toString();
const Bingo = require('./bingo_board').BingoBoard;

var input = raw_input.replace(/\n\n/g, '\n').split('\n');
var bingo_numbers = input[0].split(',');

var bingo_set = '';
var bingo_sets = [];

input.splice(0,1)

for (let kv of input.entries()) {
    let l = kv[1];
    if (bingo_set !== '')
        bingo_set += '\n';
    bingo_set += l;
    if ((kv[0] +1) % 5 === 0) {
        bingo_sets.push(new Bingo(bingo_set));
        bingo_set = '';
    }
}

var winner = {b: null, n: -1};
var winners = [];
var winner_counter = 0;

for (let b of bingo_numbers) {
    for (let set of bingo_sets) {
        if (winners.includes(set))
            continue;
        set.hit(Number.parseInt(b));
        if (set.check()) {
            winner = {
                b: set,
                n: b
            };
            winners.push(set);
        }
    }
}
var sum = winner.b.calculate(winner.n)

console.log("solution: " + sum); //21070