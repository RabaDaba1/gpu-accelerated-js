import { elements } from './base';

export const getOptions = () => {
    const options = {
        tests: [],
        iterations: elements.iterations.value
    };
    Array.from(elements.optionsCheckboxes).forEach(el => {
        if(el.checked) {
            options.tests.push({
                name: el.name,
                intensiveOn: el.dataset.intensiveon
            })
        }
    });

    return options;
};

export const switchStartBtn = () => elements.startBtn.disabled = !elements.startBtn.disabled;

export const clearResluts = () => {
    elements.results.innerHTML = '';
    elements.results.classList.remove('ghost');
};

export const renderResultsHeader = text => elements.results.insertAdjacentHTML('afterbegin', `<h1 class="results__header ghost">${text}</h1>`);

export const fadeoutResults = () => {
    const resArr = Array.from(document.querySelectorAll('.results > *'));
    const resArrForEach = animation => resArr.forEach(el => el.style.animation = animation);

    resArrForEach('none');
    resArrForEach('fadeout .25s');
};

export const renderResult = (name, intensiveOn, score) => {
    if (name === 'testPlainJS') name = 'Plain JavaScipt';
    else if (name === 'testKernel1') name = 'Kernel 1';
    else if (name === 'testKernel3') name = 'Kernel 3';

    let intensiveOnClass = 'cpu';
    if (intensiveOn === 'gpu') intensiveOnClass = 'gpu';
    
    elements.results.insertAdjacentHTML('beforeend',
    `<div class="results__result ${intensiveOnClass}">
    <div class="results__result-tab">
    <div class="results__title">${name}</div>
    <div class="results__score">${score}s</div>
    </div>
    </div>`
    )
};

export const slideResultTab = event => {
    const tab = event.target.closest('.results__result-tab');

    if(tab && !tab.parentNode.parentNode.classList.contains('ghost')) {
        tab.classList.toggle('active');
    } else {
        Array.from(document.querySelectorAll('.results__result-tab')).forEach(el => el.classList.remove('active'));
    }
}

export const renderResultStop = () => elements.results.insertAdjacentHTML('beforeend', '<div class="results__stop">30s stop</div>');

elements.html.addEventListener('click', e => {
    if(e.target.closest('.options__btn')) elements.optionsContent.classList.toggle('active');
    else if (!e.target.closest('.options__content')) elements.optionsContent.classList.remove('active');
});

elements.html.addEventListener('click', slideResultTab);