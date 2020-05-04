import { stressTests } from './models/stressTests';
import * as stressTestsView from './views/stressTestsView';

/** GLOBAL STATE OF THE APP */
const state = {};

/**
 *  Stress Tests Controller
 */
const controlStressTests = async () => {
    
    // 1) Prepare UI
    stressTestsView.resetResults();

    // 2) Start testing
    ['testPlainJS', 'testKernel1', 'testKernel3'].forEach((test, i)=> {
        const runStressTest = test => {
            // 1) Get times from test
            const { start, stop } = stressTests.runTest(test);
    
            // 2) Get score
            const score = (stop-start)/1000;
    
            // 3) Render results
            stressTestsView.renderResult(test, score);
    
            // 4) Render stopper
            stressTestsView.renderResultStop();
        }

        i === 0 ? false : true ? setTimeout(function () { runStressTest(test) }, 5000) : runStressTest(test);
    });
}

document.querySelector('.start').addEventListener('click', controlStressTests);