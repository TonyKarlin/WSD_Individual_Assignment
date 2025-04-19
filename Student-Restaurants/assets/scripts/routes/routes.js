'use strict';

import {baseUrl} from './variables.js';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Response:', response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const getDailyMeals = async (restaurantId, lang) => {
  try {
    const menu = await fetchData(
      `${baseUrl}/restaurants/daily/${restaurantId}/${lang}`
    );
    if (menu) {
      return menu;
    } else {
      console.error('Menu not found');
      return {};
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};

const getWeeklyMeals = async (restaurantId, lang) => {
  try {
    const menu = await fetchData(
      `${baseUrl}/restaurants/weekly/${restaurantId}/${lang}`
    );
    if (menu) {
      console.log('Menu', menu);
      return menu;
    } else {
      console.error('Menu not found');
      return {};
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};

const getRestaurants = async () => {
  try {
    return await fetchData(`${baseUrl}/restaurants`);
  } catch (e) {
    console.error(e);
  }
};

export {fetchData, getDailyMeals, getWeeklyMeals, getRestaurants};
