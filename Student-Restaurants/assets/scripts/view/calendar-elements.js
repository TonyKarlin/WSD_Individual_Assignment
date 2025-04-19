'use strict';

let previousHighlight = null;
let selectedDay = null;

const createCalendar = () => {
  const calendar = document.querySelector('.calendar');
  const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  calendar.innerHTML = '';

  weekDays.forEach((day) => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    dayElement.innerText = day.toUpperCase();
    dayElement.title = calendarTitles(day);
    calendarClickHandler(dayElement);
    calendar.appendChild(dayElement);
  });

  highlightToday(calendar);
};

const highlightToday = (calendar) => {
  const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  // console.log('Weekdays', weekDays);
  // console.log('Adjusted index', adjustedIndex); // Adjust to match weekDays array (Mon = 0, ..., Sun = 6)

  const dayElements = calendar.querySelectorAll('.calendar-day');
  if (dayElements[adjustedIndex]) {
    dayElements[adjustedIndex].innerText = 'TODAY';
    dayElements[adjustedIndex].classList.add('calendar-highlight');
    previousHighlight = dayElements[adjustedIndex];
  }
};

const calendarTitles = (day) => {
  switch (day) {
    case 'mon':
      return 'Monday';
    case 'tue':
      return 'Tuesday';
    case 'wed':
      return 'Wednesday';
    case 'thu':
      return 'Thursday';
    case 'fri':
      return 'Friday';
    case 'sat':
      return 'Saturday';
    case 'sun':
      return 'Sunday';
    default:
      return '';
  }
};

const calendarClickHandler = (day) => {
  day.addEventListener('click', () => {
    if (previousHighlight) {
      previousHighlight.classList.remove('calendar-highlight');
    }
    day.classList.add('calendar-highlight');
    previousHighlight = day;
    selectedDay = day.innerText.toLowerCase();
    console.log('Selected day:', selectedDay);
  });
};

export default createCalendar;
