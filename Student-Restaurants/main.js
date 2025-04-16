import {displayRestaurants, getRestaurants} from './components/restaurants.js';
import personalizeUserImg from './components/user.js';
import showMap from './components/map.js';
import {
  searchBarHandler,
  createSearchBarElements,
} from './components/search-bar.js';

const logoNavigation = () => {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    console.log('Logo clicked');
    window.location.href = 'index.html';
  });
};

const main = async () => {
  try {
    const searchElements = createSearchBarElements();
    searchBarHandler(searchElements);

    await getRestaurants();
    displayRestaurants();

    logoNavigation();
    showMap();
    personalizeUserImg();
  } catch (e) {
    console.log('Main error: ', e);
  }
};

main();
