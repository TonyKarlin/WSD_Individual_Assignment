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
  const menu = await fetchData(
    `${baseUrl}/restaurants/daily/${restaurantId}/${lang}`
  );
  if (menu) {
    return menu;
  } else {
    return {};
  }
};

const getWeeklyMeals = async (restaurantId) => {
  const menu = await fetchData(
    `${baseUrl}/restaurants/weekly/${restaurantId}/${getLanguage()}`
  );
  if (menu) {
    console.log('Manu', menu);
    return menu;
  } else {
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
