const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.toString().split('\n').map(l => l.trim());

const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const analising = (l) => {
  let open = [];

  for (let c of l.split('')) {
    if(Object.keys(pairs).includes(c)) {
      open.push(c);
      continue;
    } 
    let last = open.pop();
    if (c !== pairs[last])
      return [c];
  } 
  return ['', open ];
};

const scores = {
  '': 0,
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const part1 = input.reduce((p,c) => {
  return p += scores[analising(c)[0]];
}, 0);

const part2 = input.reduce((p,c) => {
  let [_, open] = analising(c)
  if (open)
    p.push(open.reverse().reduce((_p,c) => {
      return _p * 5 + Object.keys(scores).indexOf(pairs[c]);
    }, 0))
  return p;
}, []).sort((a,b) => a-b);

console.log("solution: " + part1);  //solution: 26397
console.log("solution: " + part2[Math.floor(part2.length/2)]);  //solution: 288957