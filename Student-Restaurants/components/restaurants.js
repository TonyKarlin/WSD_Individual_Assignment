'use strict';
import {getRestaurants} from '../routes/routes.js';
import {restaurantRow} from '../view/restaurant-elements.js';
import {defaultIcon, focusOnRestaurant, mapMarkers} from './map.js';
import {calculateDistance, getLocation} from '../lib/location.js';

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

const createRestaurantRow = (restaurant) => {
  const tr = restaurantRow(restaurant);
  tr.setAttribute('data-id', restaurant._id);
  tr.addEventListener('click', () => handleRowClick(tr, restaurant));
  return tr;
};

const handleRowClick = async (row, restaurant) => {
  try {
    if (previousHighlight === row) {
      row.classList.remove('restaurant-highlight');
      previousHighlight = null;
      selectedRestaurant = null;
      mapMarkers.forEach((marker) => marker.setIcon(defaultIcon));
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

const populateRestaurantTable = () => {
  const table = document.querySelector('.restaurant-table');
  restaurants.forEach((restaurant) => {
    const row = createRestaurantRow(restaurant);
    table.append(row);
  });
};

const highlightRestaurantRow = (restaurantId) => {
  const row = document.querySelector(`[data-id="${restaurantId}"]`);
  if (previousHighlight) {
    previousHighlight.classList.remove('restaurant-highlight');
  }
  if (row) {
    row.classList.add('restaurant-highlight');
    previousHighlight = row;

    row.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

const displayRestaurants = async () => {
  await fetchAndSetRestaurants();
  populateRestaurantTable();
};

export {displayRestaurants, highlightRestaurantRow, restaurants};
