const input = `target area: x=20..30, y=-10..-5`.toString();

let [input_x, input_y] = input.split(',');
let [x1, x2] = input_x.split('x=')[1].split('..').map(Number);
let [y1, y2] = input_y.split('y=')[1].split('..').map(Number);

const MAX_X = Math.max(x1, x2);
const MIN_Y = Math.min(y1, y2);

const shot = (x, y) => {
    let _x = x, _y = y; 
    let pos = [0, 0];
    let max_y = 0;
    let hits = [];
    while (pos[0] <= MAX_X && pos[1] > MIN_Y) {
        pos[0] += _x;
        pos[1] += _y;
        if (pos[1] > max_y)
            max_y = pos[1];
        if (hit(pos)) {
            hits.push({xv: x, yv: y, max_y: max_y, hit_pos: pos});
            break;
        }
        _x = _x > 0 ? _x - 1 : 0;
        _y--;
    }
    return hits;
}

const hit = ([x, y]) => {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

const shoting = () => {
    let max_x = Math.max(x1,x2);
    let min_y = Math.min(y1,y2);

    let hits = [];

    for (let init_x = 0; init_x <= max_x + 1; init_x++) {
        for (let init_y = min_y; init_y <= 1000; init_y++) {
            hits.push(...shot(init_x, init_y));
        }        
    }
    return hits;
}

const part1 = shoting().sort((a,b) => b.max_y - a.max_y);
console.log("solution: " + part1[0].max_y);  //solution 1: 45
const part2 = part1.length;
console.log("solution: " + part2);  //solution 2: 112