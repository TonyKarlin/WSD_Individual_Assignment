'use strict';
import {getDailyMeals} from '../routes/routes.js';
import {createMealsTable} from '../view/meal-elements.js';

const getMeals = async (restaurantId, lang = 'en') => {
  if (!restaurantId) {
    console.error('Restaurant ID', restaurantId);
    return [];
  }
  const menu = await getDailyMeals(restaurantId, lang);
  const meals = menu?.courses || [];
  console.log('meals', meals);
  return meals;
};

const displayMeals = async (restaurantId) => {
  const meals = await getMeals(restaurantId);
  createMealsTable(meals);
};

export {displayMeals};
