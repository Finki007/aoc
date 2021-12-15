const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.toString().split('\n').map(v => v.split('').map(Number));

const adjacent = [[-1, 0], [0, -1], [1, 0], [0, 1]];

const dijkstra = (arr, x, y) => {  
  let rows = arr.length, cols = arr[0].length;
  let lowestReach = Array.from({length:rows}, v => Array(cols).fill(0));

  let lowestRisk = (arr[rows-1].reduce((acc, n) => acc+n, 0) + arr.reduce((acc, row) => acc+row[0], 0))*0.7;
  let paths = [{x:x, y:y, risk: -arr[0][0]}];

  while (paths.length > 0) {
      let p = paths.pop();
      p.risk += arr[p.y][p.x];
      if ((p.risk < lowestRisk) && (p.risk < lowestReach[p.y][p.x] || lowestReach[p.y][p.x] == 0)) {
          lowestReach[p.y][p.x] = p.risk;
          if (p.x == cols-1 && p.y == rows-1) {
              if (p.risk < lowestRisk) {
                  lowestRisk = p.risk;
              }
          } else {
              if (p.x < cols-1) paths.push({ x:p.x+1, y:p.y, risk: p.risk })
              if (p.y < rows-1) paths.push({ x:p.x, y:p.y+1, risk: p.risk })
              if (p.x > 0) paths.push({ x:p.x-1, y:p.y, risk: p.risk })
              if (p.y > 0) paths.push({ x:p.x, y:p.y-1, risk: p.risk })
          }
      }
  }
  return lowestRisk;
}
const part1 = dijkstra(input, 0, 0);
console.log("solution: " + part1);  //solution: 40

let arr_part2 = [];
for (let y = 0; y < input.length*5; y++) {
  arr_part2[y] = [];
  for (let x = 0; x < input[0].length*5; x++) {
      let v = input[y % input.length][x % input[0].length]+Math.floor(y/input.length)+Math.floor(x/input[0].length);
      while (v > 9) v -= 9;
      arr_part2[y][x] = v;
  }
}
const part2 = dijkstra(arr_part2, 0, 0);
console.log("solution: " + part2);  //solution: 315