import { GPU } from 'gpu.js';

export default class StressTest {
    constructor() {
        this.gpu = new GPU();
    }

    testPlainJS() {
        return function () {
            const arr = [];
            for (let i = 0; i < 100000000; i++) {
                 arr.push(i);
            }
        }
    }

    testKernel1() {
        return this.gpu.createKernel(function() {
            return this.thread.x;
        }).setOutput([10000000]);
    }

    testKernel3() {
        return this.gpu.createKernel(function() {
            return this.thread.x+this.thread.y*1000+this.thread.z*100000;
        }).setOutput([1000, 100, 100]);
    }

    runTest(testName) {
        const start = Date.now();
        this[testName]()();
        const stop = Date.now();
        return { start, stop }
    }
}