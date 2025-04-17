import {
  displayRestaurants,
  getRestaurants,
  restaurants,
} from './components/restaurants.js';
import personalizeUserImg from './components/user.js';
import {showMap, addRestaurantsToMap, mapInstance} from './components/map.js';
import {
  searchBarHandler,
  createSearchBarElements,
} from './components/search-bar.js';
import {langDDHandler} from './components/lang-icons.js';

const mapLink = document.getElementById('map-link');

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

    mapLink.addEventListener('click', async (event) => {
      event.preventDefault();
      const map = await showMap();
      if (map) {
        addRestaurantsToMap(restaurants);
        console.log('resToMap');
      } else {
        console.error('Map not initialized');
      }
    });

    logoNavigation();
    personalizeUserImg();
  } catch (e) {
    console.log('Main error: ', e);
  }
};

main();
