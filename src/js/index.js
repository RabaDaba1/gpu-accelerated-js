import { stressTests } from './models/stressTests';
import * as stressTestsView from './views/stressTestsView';
import { elements } from './views/base';

/** GLOBAL STATE OF THE APP */
const state = {};

/**
 *  Stress Tests Controller
 */
const controlStressTests = () => {
    
    // 1) Prepare UI
    stressTestsView.fadeoutResults();

    setTimeout(() => {

        stressTestsView.clearResluts();

        // 2) Get options
        const options = stressTestsView.getOptions();
        const tests = [...options.tests];

        if (tests.length > 0) {
            stressTestsView.switchStartBtn();

            // 3) Wait 1s to load button animations (color change and)
            setTimeout(() => {
                stressTestsView.renderResultsHeader('Results');
    
                // 4) Start testing
                for (let i = 0; i < tests.length; i++) {
                    const test = tests[i];
    
                    setTimeout(() => {
                        // 5) Run test

                        // a) Get times from test
                        const { start, stop } = stressTests.runTest(test.name, options.iterations);
                
                        // b) Get score
                        const score = (stop-start)/1000;
                
                        // c) Render results
                        stressTestsView.renderResult(test.name, test.intensiveOn, score);
    
                        // d) Render stopper
                        if (i !== tests.length-1) stressTestsView.renderResultStop();
                    }, i * 30000);         
                }
                
                // 5) Switch benchmark button after all the test have finished
                setTimeout(() => {
                    stressTestsView.switchStartBtn();
                }, (tests.length-1) * 30000);
            }, 1000);
        } else {
            stressTestsView.renderResultsHeader('No tests selected')
        }
    }, 225);
}

elements.startBtn.addEventListener('click', controlStressTests);