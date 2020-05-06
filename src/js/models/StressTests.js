import { GPU } from 'gpu.js';
const gpu = new GPU();

export const stressTests = {
    testPlainJS() {
        const arr = [];
        for (let i = 0; i < 10000000; i++) {
                arr.push(i);
        }
        return arr;
    },

    testKernel1: gpu.createKernel(function() {
        return this.thread.x;
    }).setOutput([10000000]),

    testKernel3: gpu.createKernel(function() {
        return this.thread.x+this.thread.y*1000+this.thread.z*100000;
    }).setOutput([1000, 100, 100]),

    runTest(testName, iterations=50) {
        const start = Date.now();
        for (let i = 0; i < iterations; i++) {
            this[testName]();
        }
        const stop = Date.now();
        return { start, stop }
    }
}