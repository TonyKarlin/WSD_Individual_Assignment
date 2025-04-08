import showMap from './components/map.js';
import {
  searchBarHandler,
  createSearchBarElements,
} from './components/search-bar.js';

const getUserName = () => {
  return document.querySelector('.user-name');
};

function personalizeUserImg() {
  if (getUserName()) {
    const hElement = document.createElement('h2');
    const firstLetter = getUserName()
      .textContent.trim()
      .charAt(0)
      .toUpperCase();

    const userImgContainer = document.querySelector('.user-img-container');
    userImgContainer.innerHTML = '';

    hElement.textContent = firstLetter;
    userImgContainer.appendChild(hElement);

    userImgContainer.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
  } else {
    console.error('Element with class "user-name" not found.');
  }
}

const logoNavigation = () => {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    console.log('Logo clicked');
    window.location.href = 'index.html';
  });
};

const main = () => {
  const searchElements = createSearchBarElements();
  searchBarHandler(searchElements);

  logoNavigation();
  showMap();
  personalizeUserImg();
};

main();
