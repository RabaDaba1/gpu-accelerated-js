import { elements } from './base';

export const resetResults = () => elements.results.textContent = '';

export const renderResult = (testName, score) => {
    if (testName === 'testPlainJS') testName = 'Plain JavaScipt';
    else if (testName === 'testKernel1') testName = 'Kernel 1';
    else if (testName === 'testKernel3') testName = 'Kernel 3';

    elements.results.insertAdjacentHTML('beforeend', `<div class="results__result">
    <div class="results__title">${testName}</div>
    <div class="results__score">${score}s</div>
</div>`)
}

export const renderResultStop = () => elements.results.insertAdjacentHTML('beforeend', '<div class="results__stop">10s stop</div>');