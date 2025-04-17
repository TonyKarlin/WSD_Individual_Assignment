'use strict';

const mapMarkers = new Map();
let mapInstance = null;

const getMap = async () => {
  mapInstance = L.map('map').setView([60.2144768, 25.0281984], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(mapInstance);

  return mapInstance;
};

const hideMainMenuElements = () => {
  const elemsToHide = [
    document.querySelector('.image-container'),
    document.querySelector('.content'),
    document.querySelector('.main-button-container'),
    document.querySelector('.main-container h1'),
  ];

  elemsToHide.forEach((element) => {
    element.style.display = 'none';
  });
};

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

const showMap = async () => {
  const mapDiv = document.querySelector('#map');
  const mapTitle = document.querySelector('#map-title');

  if (!mapDiv) {
    console.log('mapDiv', mapDiv);
    return;
  }

  hideMainMenuElements();
  mapDiv.style.display = 'block';
  mapTitle.style.display = 'block';

  if (!mapInstance) {
    await getMap();
  }
  return mapInstance;
};

export {showMap, addRestaurantsToMap, getMap, mapInstance};
