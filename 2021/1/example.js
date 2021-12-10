const input = `199
200
208
210
200
207
240
269
260
263`.toString().split('\n').map(Number);

const part1 = input.filter((v,i) => v > input[i-1]).length;

let sum_3 = input.reduce((p,c,i) => {
    if (i > 1)
        p.push( input.slice(i-2,i+1).reduce((p, c) => p += c, 0));
    return p;
}, [])

const part2 = sum_3.filter((v,i) => v > sum_3[i-1]).length;

console.log("solution: " + part1);
// solution: 7
console.log("solution: " + part2);
// solution: 5