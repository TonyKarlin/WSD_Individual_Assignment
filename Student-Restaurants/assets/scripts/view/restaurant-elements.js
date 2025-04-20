'use strict';

export const restaurantRow = ({name, city, company}) => {
  const tr = document.createElement('tr');
  tr.className = 'restaurant-row';
  tr.innerHTML = `
    <td class="restaurant-name">${name ?? 'Unknown Name'}</td>
    <td class="restaurant-city">${city ?? 'Unknown City'}</td>
    <td class="restaurant-company">${company ?? 'Unknown Company'}</td>
  `;
  return tr;
};
