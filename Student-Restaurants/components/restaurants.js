'use strict';
import {getRestaurants} from '../routes/routes.js';
import {restaurantRow} from '../view/restaurant-elements.js';
import {defaultIcon, mapInstance, mapMarkers, selectedIcon} from './map.js';

let restaurants = [];
let selectedRestaurant = null;
let previousHighlightedRow = null;

const displayRestaurants = async () => {
  try {
    const response = await getRestaurants();
    if (response) {
      restaurants = response;
    } else {
      console.error('No restaurants found');
    }
    const table = document.querySelector('.restaurant-table');

    let previousHighlight;

    restaurants.forEach((restaurant) => {
      const tr = restaurantRow(restaurant);
      tr.setAttribute('data-id', restaurant._id);
      tr.addEventListener('click', async () => {
        try {
          if (previousHighlight === tr) {
            tr.classList.remove('restaurant-highlight');
            previousHighlight = null;
            selectedRestaurant = null;
            mapMarkers.forEach((marker) => marker.setIcon(defaultIcon));
            return;
          }

          if (previousHighlight) {
            previousHighlight.classList.remove('restaurant-highlight');
          }

          tr.classList.add('restaurant-highlight');
          previousHighlight = tr;

          selectedRestaurant = restaurant;
          console.log('selectedRestaurant', selectedRestaurant);

          mapMarkers.forEach((marker) => marker.setIcon(defaultIcon)); // Reset all markers
          const marker = mapMarkers.get(restaurant._id); // Get the corresponding marker
          if (marker) {
            marker.setIcon(selectedIcon); // Highlight the selected marker
            marker.openPopup(); // Open the popup for the marker

            mapInstance.setView(marker.getLatLng(), mapInstance.getZoom(), {
              animate: true, // Smooth animation
              duration: 0.5, // Animation duration (in seconds)
            });
          }
        } catch (e) {
          console.log('highlight error', e);
        }
      });
      table.append(tr);
    });
  } catch (e) {
    console.error('Error fetching restaurants:', e);
  }
};

const highlightRestaurantRow = (restaurantId) => {
  const row = document.querySelector(`[data-id="${restaurantId}"]`);
  if (previousHighlightedRow) {
    previousHighlightedRow.classList.remove('restaurant-highlight');
  }
  if (row) {
    row.classList.add('restaurant-highlight');
    previousHighlightedRow = row;

    row.scrollIntoView({
      behavior: 'smooth', // Smooth scrolling animation
      block: 'center', // Center the row in the visible area
    });
  }
};

export {displayRestaurants, highlightRestaurantRow, restaurants};
