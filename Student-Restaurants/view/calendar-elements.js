'use strict';

const createCalendar = () => {
  const calendar = document.querySelector('.calendar');
  const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  calendar.innerHTML = '';

  weekDays.forEach((day) => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    dayElement.innerText = day.toUpperCase();
    calendar.appendChild(dayElement);
  });
};

export default createCalendar;
