'use strict';

import {filterRestaurantByCity, options} from '../components/filter.js';
import {
  restaurants,
  populateRestaurantTable,
} from '../components/restaurants.js';

const sidebar = document.querySelector('.sidebar-header');
const checkboxContainer = document.createElement('div');
const citiesContainer = document.createElement('div');

// AI-generated function
const createCheckBoxes = () => {
  checkboxContainer.classList.add('checkbox-container');
  options.company.forEach((company) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = company;
    checkbox.value = company;
    checkbox.classList.add('company-checkbox');

    if (company === 'All') {
      checkbox.checked = true;
      checkbox.disabled = true;
    }

    const label = document.createElement('label');
    label.htmlFor = company;
    label.innerText = company;

    checkbox.addEventListener('change', () => {
      const allCheckbox = document.querySelector('#All');

      if (checkbox.id === 'All') {
        // If "All" is selected, disable other checkboxes and show all restaurants
        document.querySelectorAll('.company-checkbox').forEach((cb) => {
          if (cb !== allCheckbox) {
            cb.checked = false;
          }
        });
        populateRestaurantTable(restaurants);
      } else {
        // If another checkbox is selected, uncheck "All" and enable it
        allCheckbox.checked = false;
        allCheckbox.disabled = false;

        const selectedCompanies = Array.from(
          document.querySelectorAll('.company-checkbox:checked')
        ).map((cb) => cb.value);

        if (selectedCompanies.length === 0) {
          // If no checkboxes are selected, re-check and disable "All"
          allCheckbox.checked = true;
          allCheckbox.disabled = true;
          populateRestaurantTable(restaurants);
        } else {
          // Filter restaurants based on selected companies
          const filteredRestaurants = restaurants.filter((restaurant) =>
            selectedCompanies.includes(restaurant.company)
          );
          console.log('Filtered Restaurants:', filteredRestaurants);
          populateRestaurantTable(filteredRestaurants);
        }
      }
    });

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

  select.addEventListener('change', () => {
    const selectedCity = select.value === 'All' ? null : select.value;
    const filteredRestaurants = filterRestaurantByCity(
      restaurants,
      selectedCity
    );
    console.log('Filtered Restaurants:', filteredRestaurants);
    populateRestaurantTable(filteredRestaurants);
  });
  citiesContainer.appendChild(select);
  checkboxContainer.appendChild(citiesContainer);
};

export {createCheckBoxes, createCityDropdown};
