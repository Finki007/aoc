const fs = require('fs');
const raw_input = fs.readFileSync('input.txt').toString();

var reset = () => {
    let fishes = [0,0,0,0,0,0,0,0,0];
    raw_input.split(',').map(Number).map(v => {;
        fishes[v]++;
    });
    return fishes;
}

var growth = (arr, days) => {
    for (let i = 0; i < days; i++) {
        let news = arr.shift();
        arr[6] += news;
        arr[8] = news;
    }
    return arr;
}

console.log("solution: " + growth(reset(),80).reduce((p,v) => p += v, 0));      //solution: 351188
console.log("solution: " + growth(reset(), 256).reduce((p,v) => p += v, 0));    //solution: 1595779846729