'use strict';

export const restaurantRow = ({name, city, company}) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name ?? 'Unknown Name'}</td>
    <td>${city ?? 'Unknown City'}</td>
    <td>${company ?? 'Unknown Company'}</td>
  `;
  return tr;
};
