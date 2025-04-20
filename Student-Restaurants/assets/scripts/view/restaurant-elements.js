'use strict';

export const restaurantRow = ({name, city, company}) => {
  const tr = document.createElement('tr');
  tr.className = 'restaurant-row';
  tr.innerHTML = `
    <td class="restaurant-name">${name ?? 'Unknown Name'}</td>
    <td>${city ?? 'Unknown City'}</td>
    <td>${company ?? 'Unknown Company'}</td>
  `;
  return tr;
};
