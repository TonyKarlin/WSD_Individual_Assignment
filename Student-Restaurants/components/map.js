'use strict';
import getLocation from '../lib/location.js';

const mapMarkers = new Map();
let mapInstance = null;
const location = await getLocation();

const getMap = async () => {
  try {
    const {latitude, longitude} = location;

    if (!mapInstance) {
      mapInstance = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance);
    }
    return mapInstance;
  } catch (e) {
    console.error('Error: Failed to get location', e);

    mapInstance = L.map('map').setView([60.1699, 24.9384], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance);
  }
};

const nearestRestaurant = () => {};

const addRestaurantsToMap = (restaurants) => {
  restaurants.forEach((restaurant) => {
    const coords = restaurant.location.coordinates;
    const latitude = coords[1];
    const longitude = coords[0];
    const marker = L.marker([latitude, longitude])
      .addTo(mapInstance)
      .bindPopup(`<h4>${restaurant.name}</h4>`);

    mapMarkers.set(restaurant._id, marker);
  });
};

export {addRestaurantsToMap, getMap};
