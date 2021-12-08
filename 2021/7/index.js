const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split(',').map(Number);

const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

var calculate_fuel_const = (pos, target) => Math.abs(pos-target);
var calculate_fuel_increasing = (pos, target) => {
  let fuel = 0;
  for (let i = Math.min(pos, target); i < Math.max(pos, target); i++) {
    fuel += i - Math.min(pos, target) + 1;
  }
  return fuel;
};

console.log("solution: " + input.reduce((p,v) => calculate_fuel_const(v, median(input))+ p, 0));                                                    //solution: 364898
console.log("solution: " + input.reduce((p,v) => calculate_fuel_increasing(v, Math.floor(input.reduce((p,v) => p+v,0)/input.length)) + p, 0));      //solution: 104149091