const input = `CE00C43D881120`.toString();

//packet := 3 byte (6 hex) header
const hex2bin = (hex) => {
    let _hex = hex.split('').reduce((p,c) => p += parseInt(c,16).toString(2).padStart(4, '0'), '');
    return _hex.padStart((Math.ceil(_hex.length/4) * 4), '0');
}

const bin2dec = (bin) => {
    return parseInt(bin, 2);
}

const pop_first_n = (n, str) => {
    return [str.substring(0,n), str.slice(n)];
}


const read_header = (header) => {
    let [v,t] = pop_first_n(3, header);
    return [bin2dec(v), bin2dec(t)];
}

const read_packets = (str) => {
    const modes = {
        header: 0,
        length_id_type: 1,
        length_sub_packets: 2,
        operator: 3,
        literal_value: 4,
        end: 10
    };
    let mode = modes.header;

    let packets = [];
    let packet = {}

    let total_length = 0;

    while (true) {
        switch (mode) {
            case modes.header:
                [h, str] = pop_first_n(6, str);
                total_length += 6;
                let [v,t] = read_header(h);
                packet.header = {
                    version: v,
                    type_id: t
                };
                mode = t === 4 ? modes.literal_value : modes.length_id_type;
                break;
            case modes.length_id_type:
                [i, str] = pop_first_n(1, str);
                total_length += 1;
                packet.length_id_type = bin2dec(i);
                mode = modes.length_sub_packets;
                break;
            case modes.length_sub_packets:
                [l, str] = pop_first_n(packet.length_id_type ? 11 : 15, str);
                total_length += packet.length_id_type ? 11 : 15;
                l = bin2dec(l);
                packet.length = packet.length_id_type ? null : l;
                packet.amount = packet.length_id_type ? l : null;
                mode = modes.operator;
                break;
            case modes.operator:
                let a = packet.amount ? packet.amount : packet.length;
                while (a > 0) {
                    [_l, str, _packets] = read_packets(str);
                    total_length += _l;
                    if (!packet.sub_packets)
                        packet.sub_packets = [];
                    packet.sub_packets.push(..._packets);
                    // packets.push(..._packets);
                    a -= packet.amount ? 1 : _l;
                }
                mode = modes.end;
                break;
            case modes.literal_value:
                let first;
                do {
                    [n, str] = pop_first_n(5, str);
                    total_length += 5;
                    first = n[0];
                    if (!packet.data)
                        packet.data = "";
                    packet.data += n.slice(1);
                } while (bin2dec(first));
                packet.data_dec = bin2dec(packet.data);
                mode = modes.end;
                break;
            case modes.end:
                packets.push(packet);
                return [total_length, str, packets];
        }
    }
}

const packets = read_packets(hex2bin(input))[2];

const calc_sum = (packet) => {
    let _s = packet.header.version;
    if (packet.sub_packets) {
        for (let p of packet.sub_packets) {
            _s += calc_sum(p);
        }
    }
    return _s;
}

const part1 = calc_sum(packets[0]);
console.log("solution: " + part1);  //solution: 31

const get_value = {
    //sum
    0: (packet) => {
        return packet.sub_packets.reduce((p,c) => p += get_value[c.header.type_id](c), 0);
    },
    1: (packet) => {
        return packet.sub_packets.reduce((p,c) => p *= get_value[c.header.type_id](c), 1);
    },
    2: (packet) => {
        return packet.sub_packets.reduce((p,c) => Math.min(p, get_value[c.header.type_id](c)), Infinity);
    },
    3: (packet) => {
        return packet.sub_packets.reduce((p,c) => Math.max(p, get_value[c.header.type_id](c)), 0);
    },
    4: (packet) => {
        return packet.data_dec;
    },
    // greater than
    5: (packet) => {
        let p0 = packet.sub_packets[0], p1 = packet.sub_packets[1];
        let v0 = get_value[p0.header.type_id](p0), v1 = get_value[p1.header.type_id](p1);
        return v0 > v1 ? 1 : 0;
    },
    // less than
    6: (packet) => {
        let p0 = packet.sub_packets[0], p1 = packet.sub_packets[1];
        let v0 = get_value[p0.header.type_id](p0), v1 = get_value[p1.header.type_id](p1);
        return v0 < v1 ? 1 : 0;
    },
    // equal to
    7: (packet) => {
        let p0 = packet.sub_packets[0], p1 = packet.sub_packets[1];
        let v0 = get_value[p0.header.type_id](p0), v1 = get_value[p1.header.type_id](p1);
        return v0 === v1 ? 1 : 0;
    },
}

const part2 = get_value[packets[0].header.type_id](packets[0]);
console.log("solution: " + part2);  //solution: 315