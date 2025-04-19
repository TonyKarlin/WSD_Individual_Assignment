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

const assignMealsToDays = async (weeklyMeals, index) => {
  const meals = weeklyMeals.days[index].courses;
  const mealsList = meals.map((meal) => {
    const {name, price, diets} = meal;
    return {
      name,
      price,
      diets: diets || 'No diets available',
    };
  });
  createMealsTable(mealsList);
};

export {getMeals, assignMealsToDays};
