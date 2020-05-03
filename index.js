const { GPU } = require('gpu.js');
const gpu = new GPU();

const addZeroes = num => num.toString().length <= 16 ? '0'.repeat(16-num.toString().length) + num : num;

function plainJS() {
    const arr = [];
    for (let i = 0; i < 100000000; i++) {
         arr.push(i);
    }
}

const kernel3Thread = gpu.createKernel(function() {
    return this.thread.x+this.thread.y*1000+this.thread.z*1000000;
}).setOutput([1000, 1000, 100]);

const kernel1Thread = gpu.createKernel(function() {
    return this.thread.x;
}).setOutput([100000000]);

console.log(`----------------------START----------------------`);

const start1 = Date.now();
plainJS();
const stop1 = Date.now();
console.log(`* PLAIN JS FINISH IN: ${(stop1-start1)/1000}s`);

const start2 = Date.now();
kernel1Thread();
const stop2 = Date.now();
console.log(`* KERNEL 1 THREAD FINISH IN: ${(stop2-start2)/1000}s`);

const start3 = Date.now();
kernel3Thread();
const stop3 = Date.now();
console.log(`* KERNEL 3 THREAD FINISH IN: ${(stop3-start3)/1000}s`);

console.log(`----------------------STOP----------------------`);