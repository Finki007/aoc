const input = `2199943210
3987894921
9856789892
8767896789
9899965678`.toString().split('\n').map(l => l.split('').map(Number));

let big_array = input.map(r => {
  let _r = [...r, 9];
  _r.unshift(9)
  return _r;
});
big_array = [Array(big_array[0].length).fill(9), ...big_array, Array(big_array[0].length).fill(9)];
let valley_map = [...big_array].map(v => v.map(_ => 0));

const check_surroundings = (x,y) => {
  let surrounding = [[-1,0],[0,1],[1,0],[0,-1]];
  let _e = input[y][x];
  
  return _e < 9 && surrounding.every(v => {
    return big_array[y + 1 + v[1]][x + 1 + v[0]] > _e
  })
}

const flood_valleys = (v_x, v_y) => {
  let surrounding = [[-1,0],[0,1],[1,0],[0,-1]];
  
  let _e = big_array[v_y + 1][v_x + 1];
  if (_e === 9)
    return 0;
  let _v = valley_map[v_y + 1][v_x + 1];
  if (_v === 1)
    return 0;

  valley_map[v_y + 1][v_x + 1] = 1;

  return surrounding.reduce((p,c) => {
    return p + flood_valleys(v_x + c[0], v_y + c[1])
  }, 1);
}

console.log("solution: " + 
  input.reduce((r_p, r, r_i) => r.reduce((c_p, c, c_i) =>  check_surroundings(c_i, r_i) ? c_p + c + 1 : c_p, 0) + r_p, 0)
);  //solution: 15

var part2 = input.reduce((r_p, r, r_i) => [...r_p, ...r.reduce((c_p, c, c_i) =>  {
  if (check_surroundings(c_i, r_i)) {
    var t = flood_valleys(c_i, r_i);
    return [...c_p, {coord: [c_i, r_i], size: t}];
  }
  return c_p;
}, [])], [])
.sort((a,b) => b.size - a.size)
.slice(0,3)
.reduce((p, c) => p *= c.size, 1);

console.log("solution: " + part2);  //solution: 1134