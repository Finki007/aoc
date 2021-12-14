const fs = require('fs');
var [polymer_template, pair_insertion] = fs.readFileSync('input.txt').toString().split('\n\n');

pair_insertion = pair_insertion.split('\n').reduce((p,c) => {
  let [key, value] = c.split(' -> ');
  p[key] = value;
  return p;
}, {});

var polymer = polymer_template.split('').reduce((p,c,i) => {
  if (i === 0)
    return p;
  p[polymer_template[i-1] + c] = !p[polymer_template[i-1] + c] ? 1 : p[polymer_template[i-1] + c] + 1;
  return p;
}, {})

const calc_step = (steps) => {
  let unique = polymer_template.split('').reduce((p,c) => {
    p[c] = !p[c] ? 1 : p[c] + 1;
    return p;
  }, {});
  let p = polymer;
  for (let _ = 0; _ < steps; _++) {
    let _polymer = {};
    for (let [_p,_v] of Object.entries(p)) {
      let _i = pair_insertion[_p];
      _polymer[_p[0] + _i] = _polymer[_p[0] + _i] ? _polymer[_p[0] + _i] + _v : _v;
      _polymer[_i + _p[1]] = _polymer[_i + _p[1]] ? _polymer[_i + _p[1]] + _v : _v;
      unique[_i] = !unique[_i] ? _v : unique[_i] + _v;
    }
    p = _polymer;
  }
  let elements = Object.entries(unique).sort((a,b) => b[1] - a[1]);
  return elements[0][1] - elements.slice(-1).pop()[1]
}

const part1 = calc_step(10);
console.log("solution: " + part1);  //solution: 2967
const part2 = calc_step(40);
console.log("solution: " + part2);  //solution: 3692219987038