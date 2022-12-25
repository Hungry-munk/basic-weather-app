import * as API from './modules/apiFunctions';

const searchIcon = document.querySelector('.fa-searchengin');
const citySearch = document.querySelector('#cityName');
const isoSearch = document.querySelector('#isoCode');
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
