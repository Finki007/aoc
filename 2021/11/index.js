const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n').map(l => l.split('').map(o => { return {value: Number.parseInt(o), flash: false}}));

var flashes = 0;

const flash = (x,y) => {
  let o = input[y][x];
  o.flash = true;
  const adjacent = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
  adjacent.forEach(v => {
    let [_x, _y] = [v[0] + x, v[1] + y];
    if (_y < 0 || _y >= input.length)
      return;
    if (_x < 0 || _x >= input[0].length)
      return;

    let _o = input[_y][_x];
    _o.value++;
    if (_o.value > 9 && !_o.flash)
      flash(_x, _y);
  })
}

const calc_step = () => {
  input.flat().forEach(v => v.value++);
  input.forEach((v, y) => v.forEach((_v, x) => {
    if (_v.value <= 9 || _v.flash)
      return;
    flash(x,y);
  }));
  return input.flat().filter(v => v.flash);
}

const prepare_next = (flat_arr) => {
  flat_arr.forEach(v => {
    v.flash = false;
    v.value = 0;
  });
}

const calc_steps = (steps) => {
  let flashes = 0;
  for(let step = 0; step < steps; step++) {
    let flat_flashing = calc_step();
    flashes += flat_flashing.length;
    prepare_next(flat_flashing);
  }
  return flashes;
}

const part1 = calc_steps(100);

var part2 = 100;

do {
  part2++;
  let flat_flashing = calc_step();
  if (flat_flashing.length === input.flat().length)
    break;
  prepare_next(flat_flashing);
} while (true)


console.log("solution: " + part1);  //solution: 1679
console.log("solution: " + part2);  //solution: 519