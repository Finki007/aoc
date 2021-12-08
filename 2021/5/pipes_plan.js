exports.PipesPlan = class PipesPlan {
    constructor(max_xy) {
        this.plan = [];
        for (let c = 0; c <= max_xy[1]; c++){
            this.plan[c] = [];
            for (let r = 0; r <= max_xy[1]; r++) {
                this.plan[c][r] = '0'
            }
        }
    }

    print() {
        for (let l of this.plan) {
            let out = '';
            for (let c of l) {
                out += c + ' ';
            }
            console.log(out + '\n');
        }
    }

    create_pipe(coord) {
        let diff_x = coord.end[0] - coord.start[0];
        let diff_y = coord.end[1] - coord.start[1];

        let max_diff = Math.max(Math.abs(diff_x), Math.abs(diff_y));

        let arr_x = diff_x >= 0 ? Array.from(Array(max_diff + 1).keys()).map(v => v * (diff_x > 0 ? 1:0)) : Array.from(Array(max_diff + 1).keys()).map(v => 0 - v);
        let arr_y = diff_y >= 0 ? Array.from(Array(max_diff + 1).keys()).map(v => v * (diff_y > 0 ? 1:0)) : Array.from(Array(max_diff + 1).keys()).map(v => 0 - v);

        for (let f in arr_x) {
            let x = coord.start[0] + arr_x[f];
            let y = coord.start[1] + arr_y[f];
            let c = this.plan[y][x];
            this.plan[y][x] = c === '0' ? '1' : (Number.parseInt(c) + 1).toString();
        }

        // if (coord.start[0] === coord.end[0] || coord.start[1] === coord.end[1])
        //     for (let x = coord.start[0]; x <= coord.end[0]; x++) {
        //         for (let y = coord.start[1]; y <= coord.end[1]; y++) {
        //             let c = this.plan[y][x];
        //             this.plan[y][x] = c === '0' ? '1' : (Number.parseInt(c) + 1).toString();
        //         }
        //     }
    }

    solve() {
        let counter = 0;
        for(let i of this.plan.flat()) {
            let n = Number.parseInt(i);
            counter += n >= 2 ? 1 : 0;
        }
        return counter;
    }
}