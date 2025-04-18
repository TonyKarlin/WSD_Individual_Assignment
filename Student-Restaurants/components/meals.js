'use strict';
import {getDailyMeals} from '../routes/routes.js';
import createCalendar from '../view/calendar-elements.js';
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
  createCalendar();
  createMealsTable(meals);
};

const updateCalendarWithMenu = (weeklyMenu) => {
  const calendarDays = document.querySelectorAll('.calendar-day');

  calendarDays.forEach((dayElement) => {
    const day = dayElement.innerText.toLowerCase();
    const menuForDay = weeklyMenu[day];

    if (menuForDay) {
      dayElement.innerHTML = `<strong>${
        day.charAt(0).toUpperCase() + day.slice(1)
      }</strong>`;

      calendarDays.forEach((meal) => {
        const mealElement = document.createElement('div');
        mealElement.className = 'menu-item';
        mealElement.innerText = `${meal.name} (${meal.price} €)`;
        dayElement.appendChild(mealElement);
      });
    }
  });
};

export {displayMeals, updateCalendarWithMenu};
