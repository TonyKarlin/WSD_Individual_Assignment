'use strict';
import {restaurants} from './restaurants.js';

const options = {
  company: [],
  city: [],
};

const filterRestaurantsByCompany = (restaurants, company) => {
  if (!company) {
    return restaurants;
  }
  return restaurants.filter((restaurant) => {
    return (
      restaurant.company.split(' ').join('').toLowerCase() ===
      company.split(' ').join('').toLowerCase()
    );
  });
};

const filterRestaurantByCity = (restaurants, city) => {
  if (!city) {
    return restaurants;
  }
  return restaurants.filter((restaurant) => {
    return restaurant.city.toLowerCase() === city.toLowerCase();
  });
};

const gatherCities = () => {
  console.log('Restaurants:', restaurants);
  const uniqueCities = [
    ...new Set(restaurants.map((restaurant) => restaurant.city)),
  ];
  console.log(uniqueCities);
  options.city = ['All', ...uniqueCities];
};

const gatherCompanies = () => {
  const uniqueCompanies = [
    ...new Set(restaurants.map((restaurant) => restaurant.company)),
  ];
  options.company = ['All', ...uniqueCompanies];
};

const initializeOptions = () => {
  gatherCities();
  gatherCompanies();
};

export {
  filterRestaurantsByCompany,
  filterRestaurantByCity,
  options,
  initializeOptions,
};
