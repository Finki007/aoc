const [dots, folding_instruction] = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.toString().split('\n\n');

const input = dots.split('\n').map(l => l.split(',').map(Number));
const max_x = [...input].sort((a,b) => b[0]-a[0])[0][0];
const max_y = [...input].sort((a,b) => b[1]-a[1])[0][1];

var transparent_paper = [];
for (let y = 0; y <= max_y; y++) {
  transparent_paper[y] = [];
  for (let x = 0; x <= max_x; x++) {
    transparent_paper[y][x] = '.'
  }
}

input.forEach(c => transparent_paper[c[1]][c[0]] = '#');

const seperate = {
  x: (arr, v) => {
    return arr.reduce((p,c) => {
      let _t = c.slice(v,c.length);
      _t.shift();
      return [[...p[0], c.slice(0,v)],[...p[1], _t.reverse()]];
    }, [[],[]])
  },
  y: (arr, v) => {
    let _t = [...arr.slice(v,arr.length)]
    _t.shift();
    return [arr.slice(0,v),_t.reverse()]
  }
}

const merge = (arr) => {
  let [a1, a2] = arr;
  return a1.map((r, y) => r.map((c, x) => {
    if (c === '#')
      return c;
    return a2[y][x];
  }));
}

const folding = (instruction) => {
  let _paper = [...transparent_paper];
  instruction.forEach(i => {
    let [align, position] = i.replace('fold along ', '').split('=');
    let _s = seperate[align](_paper,position);
    _paper = merge(_s);
  });
  return _paper;
}

const part1 = folding([folding_instruction.split('\n')[0]]).flat().filter(v => v === '#').length;

console.log("solution: " + part1.length);  //solution: 17
console.log("solution: " + part2.length);  //solution: 94849