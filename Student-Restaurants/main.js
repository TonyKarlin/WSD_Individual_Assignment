import {displayRestaurants, restaurants} from './components/restaurants.js';
import personalizeUserImg from './components/user.js';
import {addRestaurantsToMap, getMap} from './components/map.js';
import {
  searchBarHandler,
  createSearchBarElements,
} from './components/search-bar.js';
import {langDDHandler} from './components/lang-icons.js';
import getLocation from './lib/location.js';
import createCalendar from './view/calendar-elements.js';

const logoNavigation = () => {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    console.log('Logo clicked');
    window.location.href = 'index.html';
  });
};

const main = async () => {
  try {
    getLocation();
    langDDHandler();

    const searchElements = createSearchBarElements();
    searchBarHandler(searchElements);

    await displayRestaurants();

    const map = await getMap();
    if (map) {
      if (!map.restaurantsAdded) {
        addRestaurantsToMap(restaurants);
        map.restaurantsAdded = true;
      }
    } else {
      console.error('Map not initialized');
    }
    createCalendar();

    logoNavigation();
    personalizeUserImg();
  } catch (e) {
    console.log('Main error: ', e);
  }
};

main();
