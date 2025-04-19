'use strict';

const getToday = () => {
  const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  return adjustedIndex;
};

const getWeekDay = (date) => {
  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const day = date.getDay();
  return weekdays[day === 0 ? 6 : day - 1];
};

export {getToday, getWeekDay};
