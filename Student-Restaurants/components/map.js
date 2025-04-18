'use strict';
import {getLocation, calculateDistance} from '../lib/location.js';
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

const resetMarkers = () => {
  mapMarkers.forEach((marker) => {
    marker.setIcon(defaultIcon);
  });
};

const selectMarker = (marker, restaurant) => {
  resetMarkers();
  marker.setIcon(selectedIcon);
  selectedRestaurant = restaurant;
  highlightRestaurantRow(restaurant._id);
  console.log('Selected restaurant from map:', selectedRestaurant);
};

const animateToSelectedMarker = (marker) => {
  mapInstance.setView(marker.getLatLng(), mapInstance.getZoom(), {
    animate: true,
    duration: 0.5,
  });
};

const addRestaurantsToMap = (restaurants) => {
  restaurants.forEach((restaurant) => {
    const [longitude, latitude] = restaurant.location.coordinates;
    const marker = L.marker([latitude, longitude], {icon: defaultIcon})
      .addTo(mapInstance)
      .bindPopup(
        `<h4>${restaurant.name}</h4>
        <p>${restaurant.address}, ${restaurant.postalCode}</p>
        <p>${restaurant.city}</p>`
      );

    marker.on('click', () => {
      selectMarker(marker, restaurant);
      animateToSelectedMarker(marker);
    });

    mapMarkers.set(restaurant._id, marker);
  });
};

const focusOnRestaurant = (restaurant) => {
  const marker = mapMarkers.get(restaurant._id);
  if (marker) {
    selectMarker(marker, restaurant);
    marker.openPopup();
    animateToSelectedMarker(marker);
  }
};

const findNearestRestaurant = async (restaurants) => {
  try {
    const location = await getLocation();
    if (!location) {
      console.error('Location not found');
      return;
    }
    const {latitude: myLat, longitude: myLon} = location;
    let nearestRestaurant = null;
    let minDistance = Infinity;

    restaurants.forEach((restaurant) => {
      const [resLon, resLat] = restaurant.location.coordinates;
      const distance = calculateDistance(myLat, myLon, resLat, resLon);
      console.log('Distance to restaurant:', distance);

      if (distance < minDistance) {
        minDistance = distance;
        nearestRestaurant = restaurant;
      }
    });

    if (nearestRestaurant) {
      console.log('Nearest restaurant:', nearestRestaurant);
      focusOnRestaurant(nearestRestaurant);
    }
  } catch (e) {
    console.error('Error finding nearest restaurant:', e);
  }
};

const getNearestRestaurant = (restaurants) => {
  const nearestBtn = document.querySelector('.nearest-restaurant');
  nearestBtn.addEventListener('click', async () => {
    try {
      console.log('Nearest restaurant button clicked');
      await findNearestRestaurant(restaurants);
    } catch (e) {
      console.error('Error finding nearest restaurant:', e);
    }
  });
};

export {
  addRestaurantsToMap,
  getMap,
  focusOnRestaurant,
  getNearestRestaurant,
  resetMarkers,
  mapInstance,
};
