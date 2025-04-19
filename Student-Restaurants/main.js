import {
  displayRestaurants,
  restaurants,
} from './assets/scripts/components/restaurants.js';
import personalizeUserImg from './assets/scripts/components/user.js';
import {
  addRestaurantsToMap,
  getMap,
  getNearestRestaurant,
} from './assets/scripts/components/map.js';
import {
  searchBarHandler,
  createSearchBarElements,
} from './assets/scripts/components/search-bar.js';
import {langDDHandler} from './assets/scripts/components/lang-icons.js';
import {
  createCheckBoxes,
  createCityDropdown,
} from './assets/scripts/view/filter-elements.js';
import {initializeOptions} from './assets/scripts/components/filter.js';

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

    await displayRestaurants();
    initializeOptions();

    const map = await getMap();
    if (map) {
      if (!map.restaurantsAdded) {
        addRestaurantsToMap(restaurants);
        map.restaurantsAdded = true;
      }
      getNearestRestaurant(restaurants);
    } else {
      console.error('Map not initialized');
    }

    logoNavigation();
    personalizeUserImg();
    createCheckBoxes();
    createCityDropdown();
  } catch (e) {
    console.log('Main error: ', e);
  }
};

main();
