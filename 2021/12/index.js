const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const build_graph = (array) => {
  let graph = {};
  array.forEach(v => {
    let [a, b] = v.split('-');
    if (!Object.keys(graph).includes(a)) {
      graph[a] = {
        connections: [b]
      }
    } else {
      graph[a].connections = [...graph[a].connections, b];
    }
    if (!Object.keys(graph).includes(b)) {
      graph[b] = {
        connections: [a]
      }
    } else {
      graph[b].connections = [...graph[b].connections, a];
    }
  });
  return graph;
};

const graph = build_graph(input);

const find_paths = (node,path, paths) => {
  if ((path.includes(node) && /start|[a-z]/g.test(node)))
    return;
  if ('end' === node) {
    paths.push([...path, node]);
    return;
  }
  let n = graph[node];
  n.connections.forEach(v => {
    find_paths(v, [...path, node], paths)
  });
  return paths;
}

const find_paths_double = (node,path, paths) => {
  var _unique = new Set(path);
  var double = path.filter((c) => {
    if (_unique.has(c)) {
      _unique.delete(c);
      return false;
    }
    return /[a-z]/g.test(c);
  });
  if ((path.includes(node) && node === 'start') || (path.includes(node) && double.includes(node)) || double.length > 1)
    return;
  if ('end' === node) {
    paths.push([...path, node]);
    return;
  }
  let n = graph[node];
  n.connections.forEach(v => {
    find_paths_double(v, [...path, node], paths)
  });
  return paths;
}

const part1 = find_paths('start', [], []);
const part2 = find_paths_double('start', [], []);

console.log("solution: " + part1.length);  //solution: 5576
console.log("solution: " + part2.length);  //solution: 152837