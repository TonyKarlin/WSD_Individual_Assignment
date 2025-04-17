'use strict';

const getWeekDay = (date) => {
  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const today = new Date();

  const day = date.getDay();
  return weekdays[day === 0 ? 6 : day - 1];
};
