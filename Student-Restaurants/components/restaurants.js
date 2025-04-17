'use strict';
import {getRestaurants} from '../routes/routes.js';
import {restaurantRow} from '../view/restaurant-elements.js';
import {displayMeals} from './meals.js';

let restaurants = [];

const displayRestaurants = async () => {
  try {
    const response = await getRestaurants();
    if (response) {
      restaurants = response;
    } else {
      console.error('No restaurants found');
    }
    const table = document.querySelector('.restaurant-table');

    let previousHighlight;

    restaurants.forEach((restaurant) => {
      const tr = restaurantRow(restaurant);
      tr.addEventListener('click', async () => {
        try {
          if (previousHighlight === tr) {
            tr.classList.remove('restaurant-highlight');
            previousHighlight = null;
            return;
          }

          if (previousHighlight) {
            previousHighlight.classList.remove('restaurant-highlight');
          }

          tr.classList.add('restaurant-highlight');

          await displayMeals(restaurant._id);

          previousHighlight = tr;
        } catch (e) {
          console.log('highlight error', e);
        }
      });
      table.append(tr);
    });
  } catch (e) {
    console.error('Error fetching restaurants:', e);
  }
};

export {displayRestaurants, restaurants};
