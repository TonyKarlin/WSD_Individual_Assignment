'use strict';

const displayMapElements = () => {
  const mapDiv = document.querySelector('#map');
  const mapTitle = document.querySelector('#map-title');

  if (!mapDiv) {
    console.log('mapDiv', mapDiv);
    return;
  }

  mapDiv.style.display = 'block';
  mapDiv.style.borderRadius = '8px';
  mapDiv.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
  mapTitle.style.display = 'block';
};

export default displayMapElements;
