'use strict';

import createCalendar from '../view/calendar-elements.js';

const getWeekDay = (date) => {
  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const day = date.getDay();
  return weekdays[day === 0 ? 6 : day - 1];
};

const highlightTodayInCalendar = () => {
  const today = new Date();
  const todayWeekDay = getWeekDay(today);
  const calendarDays = document.querySelectorAll('.calendar-day');

  calendarDays.forEach((dayElement) => {
    if (dayElement.innerText.toLowerCase() === todayWeekDay) {
      dayElement.innerText = 'Today';
      dayElement.style.backgroundColor = '#181818';
    }
  });
};

const initializeCalendar = () => {
  createCalendar();
  highlightTodayInCalendar();
};

export default initializeCalendar;
