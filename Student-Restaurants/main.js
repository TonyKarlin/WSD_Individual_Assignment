import {displayRestaurants, getRestaurants} from './components/restaurants.js';
import personalizeUserImg from './components/user.js';
import showMap from './components/map.js';
import {
  searchBarHandler,
  createSearchBarElements,
} from './components/search-bar.js';
import {langDDHandler} from './components/lang-icons.js';

const logoNavigation = () => {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    console.log('Logo clicked');
    window.location.href = 'index.html';
  });
};

const main = async () => {
  try {
    langDDHandler();

    const searchElements = createSearchBarElements();
    searchBarHandler(searchElements);

    await getRestaurants();
    displayRestaurants();

    logoNavigation();
    showMap();
    console.log('map');
    personalizeUserImg();
  } catch (e) {
    console.log('Main error: ', e);
  }
};

main();
