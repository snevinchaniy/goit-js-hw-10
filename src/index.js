import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// пошук елементів
const countryInputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// слухач на input
countryInputSearch.addEventListener(
  'input',
  Debounce(searchCountry, DEBOUNCE_DELAY)
);

// отримання даних пошуку, що вводять користувачі
function searchCountry(e) {
  e.preventDefault();
  const nameCountry = e.target.value.trim();
  clearMarkup();
  fetchCountries(nameCountry).then(countries => {
    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countries.length === 0) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    renderCountry(countries);
  });
  // .catch(error => {
  // console.log(error);
  // Notiflix.Notify.failure('Oops, there is no country with that name.');
}

// розмітка для однієї країни
function renderCountryList(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        `<li class = "item"><img src="${flags.svg}"
        alt"${name.official}" width="40" height="25" clall = item-img>${name.official}</li>`
    )
    .join('');
}

// розмітка для декількох країн
function renderCountryOne(countries) {
  return countries
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<h1><img src="${flags.svg}" alt="${
          name.official
        }" width="40" height="25">
        ${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
    )
    .join('');
}

// рендер розмітки
function renderCountry(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    clearMarkup();
    const infoList = renderCountryList(countries);
    countryList.innerHTML = infoList;
  } else if (countries.length === 1) {
    clearMarkup();
    const infoOne = renderCountryOne(countries);
    countryInfo.innerHTML = infoOne;
  }
}

// очищення розмітки
function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
