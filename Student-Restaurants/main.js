const userImgContainer = document.querySelector('.user-img-container');
const hElement = document.createElement('h2');
const userName = document.querySelector('.user-name');
const asideHeader = document.querySelector('.sidebar-header');
const asideHeaderHElem = document.querySelector('.sidebar-header h2');
const asideHeaderImg = document.querySelector('.sidebar-header img');
const asideSeparator = document.querySelector('.sidebar-separator');

function personalizeUserImg() {
  if (userName) {
    const firstLetter = userName.textContent.trim().charAt(0).toUpperCase();

    hElement.textContent = firstLetter;
    userImgContainer.appendChild(hElement);
  } else {
    console.error('Element with class "user-name" not found.');
  }
}

function createLocationLinks() {
  userImgContainer.addEventListener('click', () => {
    console.log('User image clicked');
    window.location.href = 'profile.html';
  });

  const logo = document.querySelector('.logo img');

  logo.addEventListener('click', () => {
    console.log('Logo clicked');
    window.location.href = 'index.html';
  });
}

function searchBarHandler() {
  asideHeaderImg.addEventListener('click', () => {
    console.log('Search button clicked');
    if (!asideHeader.querySelector('.search-input')) {
      const searchInput = document.createElement('input');
      searchInput.className = 'search-input';
      searchInput.setAttribute('type', 'text');
      searchInput.setAttribute('placeholder', 'Search for restaurants');

      const closeIcon = document.createElement('img');
      closeIcon.id = 'close-icon';
      closeIcon.src = './resources/close-icon.png';
      closeIcon.alt = 'Close icon';
      closeIcon.width = 10;
      closeIcon.height = 10;
      closeIcon.title = 'Close';
      closeIcon.addEventListener('click', () => {
        searchInput.remove();
        closeIcon.remove();
        asideHeaderHElem.style.display = 'block';
      });

      asideHeader.insertBefore(closeIcon, asideSeparator);
      asideHeader.insertBefore(searchInput, asideHeaderHElem);
      asideHeaderHElem.style.display = 'none';
    }
  });
}

function showMap() {
  document.addEventListener('DOMContentLoaded', () => {
    const mapLink = document.getElementById('map-link');
    const mainImg = document.querySelector('.image-container');
    const mainContent = document.querySelector('.content');
    const mainBtnContainer = document.querySelector('.main-button-container');
    const mapDiv = document.querySelector('#map');

    mapLink.addEventListener('click', (event) => {
      event.preventDefault();

      mainImg.style.display = 'none';
      mainContent.style.display = 'none';
      mainBtnContainer.style.display = 'none';
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
}

showMap();
createLocationLinks();
personalizeUserImg();
searchBarHandler();
