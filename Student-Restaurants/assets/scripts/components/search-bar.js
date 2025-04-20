'use strict';

const createSearchBarElements = () => {
  const searchElements = {
    asideHeader: document.querySelector('.sidebar-header'),
    asideHeaderHElem: document.querySelector('.sidebar-header h2'),
    asideHeaderImg: document.querySelector('.search-img-container'),
    asideWrapper: document.querySelector('.sidebar-wrapper'),
  };
  return searchElements;
};

const createSearchBar = () => {
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';
  const searchInput = document.createElement('input');
  searchInput.className = 'search-input';
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search for restaurants   (Esc)');

  searchWrapper.appendChild(searchInput);

  return searchWrapper;
};

const searchBarHandler = (elements) => {
  if (!elements) {
    return;
  }

  const {asideWrapper, asideHeaderHElem, asideHeaderImg} = elements;

  asideHeaderImg.addEventListener('click', () => {
    if (!asideWrapper.querySelector('.search-input')) {
      const searchBar = createSearchBar();
      const searchInput = searchBar.querySelector('.search-input');

      const handleEscKey = (event) => {
        if (event.key === 'Escape') {
          searchBar.remove();
          asideHeaderHElem.style.display = 'block';
          document.removeEventListener('keydown', handleEscKey);
        }
      };

      document.addEventListener('keydown', handleEscKey);

      searchInput.addEventListener('input', handleSearch);
      asideWrapper.insertBefore(searchBar, asideHeaderHElem);
      asideHeaderHElem.style.display = 'none';
    }
  });
};

const handleSearch = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const restaurantRows = document.querySelectorAll('.restaurant-row');

  restaurantRows.forEach((row) => {
    const restaurantNameElem = row.querySelector('.restaurant-name');
    console.log('restaurant content', restaurantNameElem.textContent);
    const restaurantName = restaurantNameElem
      ? restaurantNameElem.textContent.toLowerCase()
      : '';
    if (restaurantName.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};

export {searchBarHandler, createSearchBarElements};
