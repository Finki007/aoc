const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`.toString().split('\n');

const identified_numbers = line => {
  return line.split('|')[1].split(' ').filter(v => [2,3,4,7].includes(v.length)).length
};

const subtract_7_segment = (s1, s2) => {
  return s1.split('').filter(v => !s2.split('').includes(v)).join('');
}

const generate_code = (_input) => {
    _input = _input.sort((a,b) => a.length - b.length).map(v => v.split('').sort().join(''));

    let _codes = []

    let _1 = _input.filter(v => v.length === 2)[0];
    let _4 = _input.filter(v => v.length === 4)[0];
    let _7 = _input.filter(v => v.length === 3)[0];
    let _8 = _input.filter(v => v.length === 7)[0];

    let _5 = _input.filter(v => v.length === 5).filter(v => subtract_7_segment(v, subtract_7_segment(_4, _1)).length === 3)[0];
    let _3 = _input.filter(v => v.length === 5).filter(v => subtract_7_segment(v, _1).length === 3)[0];
    let _2 = _input.filter(v => ![_3, _5].includes(v) && v.length === 5)[0];

    let _9 = _input.filter(v => v.length === 6).filter(v => subtract_7_segment(v, _3).length === 1)[0];
    let _6 = _input.filter(v => v.length === 6 && subtract_7_segment(v, _5).length === 1 && v !== _9)[0];

    _codes = [_1,_2,_3,_4,_5,_6,_7,_8,_9];
    return [_input.filter(v => !_codes.includes(v))[0], ..._codes];
}

const decode = (_input, code) => {
  _input = _input.map(v => v.split('').sort().join(''));
  return +_input.map(v => code.indexOf(v)).map(Number).join('');
}

const solve_wire = line => {
  let [_input, _output] = line.split('|').map(v => v.trim().split(' '));
  let code = generate_code(_input);
  return decode(_output, code);
}

console.log("solution: " + input.map(l => identified_numbers(l)).reduce((p,v) => p + v, 0));  //solution: 26
console.log("solution: " + input.map(l => solve_wire(l)).reduce((p,v) => p + v, 0));  //solution: 61229