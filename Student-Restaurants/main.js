import {
  fetchAndSetRestaurants,
  populateRestaurantTable,
  restaurants,
} from './assets/scripts/components/restaurants.js';
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
import {
  handleLanguageChange,
  translatePage,
} from './assets/scripts/components/translate-page.js';
import {updateUIForLoggedInUser} from './assets/scripts/view/user-profile-elements.js';
import {logout} from './assets/scripts/components/logout.js';

const logoNavigation = () => {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    console.log('Logo clicked');
    window.location.href = 'index.html';
  });
};

const main = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    translatePage(savedLang);
  });
  try {
    await fetchAndSetRestaurants();
    langDDHandler();

    const searchElements = createSearchBarElements();
    searchBarHandler(searchElements);

    populateRestaurantTable(restaurants);
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
    createCheckBoxes();
    createCityDropdown();
    handleLanguageChange();
    updateUIForLoggedInUser();

    const logoutButton = document.querySelector('#home-logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }
  } catch (e) {
    console.error('Main error: ', e);
  }
};

main();
