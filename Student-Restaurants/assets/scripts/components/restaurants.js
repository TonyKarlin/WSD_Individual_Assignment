'use strict';
import {getRestaurants} from '../routes/routes.js';
import {createCalendar} from '../view/calendar-elements.js';
import {hidePlaceholders} from '../view/placeholder-elements.js';
import {restaurantRow} from '../view/restaurant-elements.js';
import {focusOnRestaurant, resetMarkers} from './map.js';

let restaurants = [];
let selectedRestaurant = null;
let previousHighlight;

const fetchAndSetRestaurants = async () => {
  try {
    const response = await getRestaurants();
    if (response) {
      restaurants = response;
    } else {
      console.error('No restaurants found');
    }
  } catch (e) {
    console.error('Error fetching restaurants:', e);
  }
};

const handleRowClick = async (row, restaurant) => {
  try {
    if (previousHighlight === row) {
      row.classList.remove('restaurant-highlight');
      previousHighlight = null;
      selectedRestaurant = null;
      resetMarkers();
      return;
    }

    if (previousHighlight) {
      previousHighlight.classList.remove('restaurant-highlight');
    }

    row.classList.add('restaurant-highlight');
    previousHighlight = row;

    selectedRestaurant = restaurant;
    console.log('selectedRestaurant', selectedRestaurant);

    focusOnRestaurant(restaurant);
  } catch (e) {
    console.log('highlight error', e);
  }
};

const createRestaurantRow = (restaurant) => {
  const tr = restaurantRow(restaurant);
  tr.setAttribute('data-id', restaurant._id);
  tr.addEventListener('click', () => handleRowClick(tr, restaurant));
  return tr;
};

const populateRestaurantTable = (restaurants) => {
  const table = document.querySelector('.restaurant-table');
  const tbody = document.querySelector('.restaurant-list');
  if (!tbody) {
    console.error('No tbody found');
    return;
  }

  tbody.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const row = createRestaurantRow(restaurant);
    tbody.append(row);
  });
  table.append(tbody);
};

const highlightRestaurantRow = async (restaurantId) => {
  const row = document.querySelector(`[data-id="${restaurantId}"]`);
  hidePlaceholders();
  if (previousHighlight) {
    previousHighlight.classList.remove('restaurant-highlight');
  }
  if (row) {
    row.classList.add('restaurant-highlight');
    previousHighlight = row;
    const lang = localStorage.getItem('lang') || 'en';
    await createCalendar(restaurantId, lang);

    row.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

export {
  highlightRestaurantRow,
  restaurants,
  fetchAndSetRestaurants,
  populateRestaurantTable,
};
