'use strict';
import {getWeeklyMeals} from '../routes/routes.js';
import {assignMealsToDays} from '../components/meals.js';
import {getToday} from '../lib/date.js';
import {translations} from '../lib/translations.js';

let previousHighlight = null;
let selectedDay = null;
let isCalendarCreated = false;

const createCalendar = async (restaurantId) => {
  if (isCalendarCreated) return;
  isCalendarCreated = true;

  const lang = localStorage.getItem('lang') || 'en';
  const calendar = document.querySelector('.calendar');
  const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  calendar.innerHTML = '';

  try {
    const weeklyMenu = await getWeeklyMeals(restaurantId, lang);

    const weeklyMenuContainer = document.querySelector('.meals-table');
    weeklyMenuContainer.innerHTML = '';

    weekDays.forEach(async (day, i) => {
      if (
        weeklyMenu &&
        weeklyMenu.days &&
        weeklyMenu.days[i] &&
        weeklyMenu.days[i].courses.length > 0
      ) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerText = day.toUpperCase();
        dayElement.title = calendarTitles(day, lang);
        calendarClickHandler(dayElement, i, weeklyMenu);
        calendar.appendChild(dayElement);

        await assignMealsToDays(weeklyMenu, i);
      }
    });

    checkForEmpyMeals(weeklyMenu, calendar);

    const menuContainer = document.querySelector('.menu-container');
    menuContainer.style.display = 'flex';
    highlightToday(calendar);
  } catch (e) {
    console.error('Error creating calendar:', e);
  } finally {
    isCalendarCreated = false;
  }
};

const highlightToday = (calendar) => {
  const adjustedIndex = getToday();

  const dayElements = calendar.querySelectorAll('.calendar-day');
  if (dayElements[adjustedIndex]) {
    dayElements[adjustedIndex].innerText = 'TODAY';
    dayElements[adjustedIndex].classList.add('calendar-highlight');
    previousHighlight = dayElements[adjustedIndex];
  }
};

const checkForEmpyMeals = (weeklyMenu, calendar) => {
  if (
    !weeklyMenu.days ||
    weeklyMenu.days.every((day) => !day.courses || day.courses.length < 1)
  ) {
    if (!calendar.querySelector('.no-meals')) {
      const placeholder = document.createElement('div');
      placeholder.classList.add('no-meals');
      placeholder.innerText = 'No meals available';
      calendar.appendChild(placeholder);
    }
    return;
  }
};

const calendarTitles = (day, lang = 'en') => {
  const days = {
    mon: 'monday',
    tue: 'tuesday',
    wed: 'wednesday',
    thu: 'thursday',
    fri: 'friday',
    sat: 'saturday',
    sun: 'sunday',
  };
  return translations[lang][days[day]] || '';
};

const calendarClickHandler = (day, dayIndex, weeklyMenu) => {
  day.addEventListener('click', async () => {
    if (previousHighlight) {
      previousHighlight.classList.remove('calendar-highlight');
    }
    day.classList.add('calendar-highlight');
    previousHighlight = day;
    selectedDay = day.innerText.toLowerCase();
    console.log('Selected day:', selectedDay);

    if (weeklyMenu && weeklyMenu.days && weeklyMenu.days[dayIndex]) {
      await assignMealsToDays(weeklyMenu, dayIndex);
    }
  });
};

export {createCalendar};
