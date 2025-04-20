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
    return restaurant.company.toLowerCase() === company.toLowerCase();
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
  options.city = ['All', ...uniqueCities]; // Add "All" as the default option
};

const gatherCompanies = () => {
  const uniqueCompanies = [
    ...new Set(restaurants.map((restaurant) => restaurant.company)),
  ];
  options.company = ['All', ...uniqueCompanies]; // Add "All" as the default option
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
