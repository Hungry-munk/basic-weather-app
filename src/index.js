import * as API from './modules/apiFunctions';
import { convertImperical, convertMetric } from './modules/unitConversion';

const searchIcon = document.querySelector('.fa-searchengin');
const citySearch = document.querySelector('#cityName');
const isoSearch = document.querySelector('#isoCode');
const unitSwitch = document.querySelector('.unitSwitch');
// setting up event listeners
searchIcon.addEventListener('click', () => {
    const cityName = document.querySelector('#cityName').value;
    const Iso = document.querySelector('#isoCode').value;
    API.processSearch(cityName, Iso);
});
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = document.querySelector('#cityName').value;
        const Iso = document.querySelector('#isoCode').value;
        API.processSearch(cityName, Iso);
    }
});
isoSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = document.querySelector('#cityName').value;
        const Iso = document.querySelector('#isoCode').value;
        API.processSearch(cityName, Iso);
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

API.processSearch('melbourne', 'au');
