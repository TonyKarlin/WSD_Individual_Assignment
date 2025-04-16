'use strict';
import fetchData from '../lib/utils.js';
import {restaurantRow} from '../view/restaurant-elements.js';
import {baseUrl} from '../lib/variables.js';

let restaurants = [];

const getRestaurants = async () => {
  try {
    restaurants = await fetchData(`${baseUrl}/restaurants`);
    return restaurants;
  } catch (e) {
    console.error(e);
  }
};

const getMenu = async (id, lang) => {
  try {
    return await fetchData(`${baseUrl}/restaurants/daily/${id}/${lang}`);
  } catch (e) {
    console.error(e);
  }
};

const displayRestaurants = () => {
  console.log(restaurants);
  const table = document.querySelector('.restaurant-table');

  let previousHighlight;

  restaurants.forEach((restaurant) => {
    const tr = restaurantRow(restaurant);
    tr.addEventListener('click', async () => {
      try {
        if (previousHighlight) {
          previousHighlight.classList.remove('restaurant-highlight');
        }

        tr.classList.add('restaurant-highlight');

        const menu = await getMenu(restaurant._id, 'fi');
        previousHighlight = tr;
      } catch (e) {
        console.log('highlight error', e);
      }
    });
    table.append(tr);
  });
};

export {getRestaurants, displayRestaurants};
