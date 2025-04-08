'use strict';
const hideMainMenuElements = () => {
  const elemsToHide = [
    document.querySelector('.image-container'),
    document.querySelector('.content'),
    document.querySelector('.main-button-container'),
  ];

  elemsToHide.forEach((element) => {
    element.style.display = 'none';
  });
};

const showMap = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const mapLink = document.getElementById('map-link');
    const mapDiv = document.querySelector('#map');

    if (!mapLink || !mapDiv) {
      return;
    }

    mapLink.addEventListener('click', (event) => {
      event.preventDefault();

      hideMainMenuElements();
      mapDiv.style.display = 'block';

      setTimeout(() => {
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
      }, 0);
    });
  });
};

export default showMap;
