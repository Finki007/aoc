const fs = require('fs');
var pipes = fs.readFileSync('input.txt').toString().split('\n');

const Plan = require('./pipes_plan').PipesPlan;

var max_coords = [0,0];

var pipe_cmds = pipes.reduce((p,c) => {
    let s_e = c.replace(/\s/g,'').split('->');
    let p1 = s_e[0].split(',').map(v => Number.parseInt(v));
    let p2 = s_e[1].split(',').map(v => Number.parseInt(v));

    let start = [Math.min(p1[0],p2[0]), Math.min(p1[1],p2[1])];
    let end = [Math.max(p1[0],p2[0]), Math.max(p1[1],p2[1])];

    max_coords[0] = Math.max(start[0], end[0], max_coords[0]);
    max_coords[1] = Math.max(start[1], end[1], max_coords[1]);

    p.push({start: start,end: end});
    return p;
}, [])

var plan = new Plan(max_coords);

for (let cmd of pipe_cmds) {
    plan.create_pipe(cmd);
}

plan.print()
var solution = plan.solve();

console.log("solution: " + solution);