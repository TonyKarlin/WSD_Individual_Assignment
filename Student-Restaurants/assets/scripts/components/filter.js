'use strict';

const filterRestaurantsByCompany = (restaurants, company) => {
  if (!company) {
    return restaurants;
  }
  return restaurants.filter((restaurant) => restaurant.company === company);
};

const filterRestaurantByCity = (restaurants, city) => {
  if (!city) {
    return restaurants;
  }
  return restaurants.filter((restaurant) => restaurant.city === city);
};

export {filterRestaurantsByCompany, filterRestaurantByCity};
