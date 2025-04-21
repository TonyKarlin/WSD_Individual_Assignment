'use strict';

import {
  filterRestaurantByCity,
  filterRestaurantsByCompany,
  options,
} from '../components/filter.js';
import {rerenderMap} from '../components/map.js';
import {
  restaurants,
  populateRestaurantTable,
} from '../components/restaurants.js';

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
    checkbox.classList.add(
      `${company.split(' ').join('').toLowerCase()}-checkbox`
    );
    if (company === 'All') {
      checkbox.checked = true;
      checkbox.disabled = true;
    }

    const label = document.createElement('label');
    label.classList.add(`${company.split(' ').join('').toLowerCase()}-label`);
    label.htmlFor = company;
    label.innerText = company;

    checkboxContainer.addEventListener('change', (event) => {
      const checkbox = event.target;
      const company = checkbox.value;
      checkboxLogic(checkbox, company);
    });

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
  });
  sidebar.appendChild(checkboxContainer);
};

const checkboxLogic = (checkbox) => {
  const allCheckboxes = document.querySelectorAll(
    '.checkbox-container input[type="checkbox"]'
  );
  allCheckboxes.forEach((cb) => {
    cb.checked = false;
    cb.disabled = false;
  });

  switch (checkbox.className) {
    case 'all-checkbox':
      populateRestaurantTable(restaurants);
      rerenderMap(restaurants);
      checkbox.checked = true;
      checkbox.disabled = true;
      break;
    case 'compassgroup-checkbox': {
      const compassRestaurants = filterRestaurantsByCompany(
        restaurants,
        'compassgroup'
      );
      populateRestaurantTable(compassRestaurants);
      rerenderMap(compassRestaurants);
      checkbox.checked = true;
      checkbox.disabled = true;
      break;
    }
    case 'sodexo-checkbox': {
      const sodexoRestaurants = filterRestaurantsByCompany(
        restaurants,
        'sodexo'
      );
      populateRestaurantTable(sodexoRestaurants);
      rerenderMap(sodexoRestaurants);
      checkbox.checked = true;
      checkbox.disabled = true;
      break;
    }
  }
};

const createCityDropdown = () => {
  const elements = cityDDElements();

  options.city.forEach((city) => {
    const option = document.createElement('option');
    option.id = `${city.split(' ').join('').toLowerCase()}-option`;
    option.value = city;
    option.innerText = city;
    elements.select.appendChild(option);
  });

  elements.select.addEventListener('change', () => {
    const selectedCity =
      elements.select.value === 'All' ? null : elements.select.value;
    const filteredRestaurants = filterRestaurantByCity(
      restaurants,
      selectedCity
    );
    populateRestaurantTable(filteredRestaurants);
    rerenderMap(filteredRestaurants);
  });
  citiesContainer.appendChild(elements.select);
  checkboxContainer.appendChild(citiesContainer);
};

const cityDDElements = () => {
  const elements = {
    select: document.createElement('select'),
    citiesLabel: document.createElement('label'),
    citiesContainer: document.createElement('div'),
  };
  elements.select.classList.add('city-dropdown');
  elements.citiesLabel.innerText = 'Cities:';
  elements.citiesLabel.classList.add('cities-label');
  elements.citiesContainer.classList.add('cities-container');
  elements.citiesContainer.appendChild(elements.citiesLabel);

  return elements;
};

export {createCheckBoxes, createCityDropdown};
