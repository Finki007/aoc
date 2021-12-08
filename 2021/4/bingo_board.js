exports.BingoBoard = class BingoBoard {
    constructor(lines) {
        this.board = [];
        this.winner_number = 0;
        for (let l of lines.split('\n').entries()) {
            let _l = l[1].replace(/^\s*/g, '')
            .replace(/\s+/g, ' ');
            this.board[l[0]] = [];
            for (let n of _l.split(' ').entries()) {
                this.board[l[0]][n[0]] = {n: Number.parseInt(n[1]), h: false };
            }
        }
    }

    hit(n) {
        for (let i of this.board.flat().entries()) {
            if (i[1].n === n) {
                try {
                    this.board[~~(i[0]/5)][i[0]%5].h = true;
                } catch (er) {
                    debugger;
                }
            }
        }
    }

    check(n) {
        let temp = this.board.flat();
        for (let i = 0; i < 5; i++) {
            var col = temp.filter((v,_i) => _i % 5 === i);
            var row = this.board[i];

            let _check = (v) => v.h;

            if (col.every(_check) || row.every(_check)) {
                return true;
            }
        }
        return false;
    }

    calculate(n, w) {
        this.winner_number = w;
        let sum = this.board.flat().reduce((p,c) => {
            return p += !c.h ? c.n : 0;
        }, 0);
        return sum *= n;
    }
}