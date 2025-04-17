'use strict';

let mapInstance = null;

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

const showMap = () => {
  console.log('showmap function called');
  const mapLink = document.getElementById('map-link');
  const mapDiv = document.querySelector('#map');
  const mapTitle = document.querySelector('#map-title');

  if (!mapLink || !mapDiv) {
    console.log('maplink', mapLink);
    console.log('mapDiv', mapDiv);
    return;
  }

  mapLink.addEventListener('click', (event) => {
    event.preventDefault();

    hideMainMenuElements();
    mapDiv.style.display = 'block';
    mapTitle.style.display = 'block';

    setTimeout(() => {
      if (!mapInstance) {
        mapInstance = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapInstance);
      }
    }, 0);
  });
};

export default showMap;
