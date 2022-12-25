import * as API from './modules/apiFunctions';
import { convertImperical, convertMetric } from './modules/unitConversion';

const searchIcon = document.querySelector('.fa-searchengin');
const citySearch = document.querySelector('#cityName');
const isoSearch = document.querySelector('#isoCode');
const unitSwitch = document.querySelector('.unitSwitch');
// setting up event listeners
searchIcon.addEventListener('click', API.processSearch);
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        API.processSearch();
    }
});
isoSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        API.processSearch();
    }
});

unitSwitch.addEventListener('change', () => {
    const switchState = unitSwitch.checked;
    if (switchState) {
        // imperical
        convertImperical();
    } else {
        // metric
        convertMetric();
    }
});
