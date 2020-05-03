import './_main.scss';
import StressTest from './models/StressTests';
import * as stressTestView from './views/stressTestView';

/** GLOBAL STATE OF THE APP */
const state = {};

/**
 *  Stress Test Controller
 */
const controlStressTest = async () => {
    
    // 1) Prepare UI
    stressTestView.resetResults();
    
    state.stressTests = new StressTest();

    // 2) Start plain JavaScript stress test
    ['testPlainJS', 'testKernel1', 'testKernel3'].forEach(test => {
        setTimeout(function() {
            const { start, stop } = state.stressTests.runTest(test);

            // 2) Get score
            const score = (stop-start)/1000;

            // 3) Render results
            stressTestView.renderResult(test, score);

            // 4) Render stopper
            stressTestView.renderResultStop();
        }, 1000);
    })
}

document.querySelector('.start').addEventListener('click', controlStressTest);