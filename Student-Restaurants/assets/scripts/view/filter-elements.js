'use strict';

import {options} from '../components/filter.js';

const sidebar = document.querySelector('.sidebar-header');
const checkboxContainer = document.createElement('div');
const citiesContainer = document.createElement('div');

const createCheckBoxes = () => {
  checkboxContainer.classList.add('checkbox-container');
  options.company.forEach((company) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = company;
    checkbox.value = company;
    checkbox.classList.add('company-checkbox');

    const label = document.createElement('label');
    label.htmlFor = company;
    label.innerText = company;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
  });
  sidebar.appendChild(checkboxContainer);
};

const createCityDropdown = () => {
  const select = document.createElement('select');
  select.classList.add('city-dropdown');
  const citiesLabel = document.createElement('label');
  citiesLabel.innerText = 'Cities:';
  citiesLabel.classList.add('cities-label');
  citiesContainer.classList.add('cities-container');
  citiesContainer.appendChild(citiesLabel);

  options.city.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.innerText = city;
    select.appendChild(option);
  });
  citiesContainer.appendChild(select);
  sidebar.appendChild(citiesContainer);
};

export {createCheckBoxes, createCityDropdown};
