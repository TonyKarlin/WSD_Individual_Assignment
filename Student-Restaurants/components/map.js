'use strict';
import getLocation from '../lib/location.js';
import {highlightRestaurantRow} from './restaurants.js';

const mapMarkers = new Map();
let mapInstance = null;
const location = await getLocation();
let selectedRestaurant = null;

const defaultIcon = L.icon({
  iconUrl: './resources/default-pin.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -32],
});

const selectedIcon = L.icon({
  iconUrl: './resources/selected-pin.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -32],
});

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
    const marker = L.marker([latitude, longitude], {icon: defaultIcon})
      .addTo(mapInstance)
      .bindPopup(`<h4>${restaurant.name}</h4>`);

    marker.on('click', () => {
      mapMarkers.forEach((m) => {
        m.setIcon(defaultIcon);
      });
      marker.setIcon(selectedIcon);

      selectedRestaurant = restaurant;
      highlightRestaurantRow(restaurant._id);
      console.log('Selected restaurant from map:', selectedRestaurant);
      mapInstance.setView(marker.getLatLng(), mapInstance.getZoom(), {
        animate: true, // Smooth animation
        duration: 0.5, // Animation duration (in seconds)
      });
    });

    mapMarkers.set(restaurant._id, marker);
  });
};

export {
  addRestaurantsToMap,
  getMap,
  mapMarkers,
  defaultIcon,
  selectedIcon,
  mapInstance,
};
