'use strict';

export const restaurantRow = ({name, city}) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name ?? 'Unknown Name'}</td>
    <td>${city ?? 'Unknown Company'}</td>
  `;
  return tr;
};
