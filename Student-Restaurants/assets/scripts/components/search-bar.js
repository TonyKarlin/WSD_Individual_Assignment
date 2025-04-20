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
  const restaurantData = searchParameters();

  restaurantData.forEach(({row, restaurantName, city, company}) => {
    if (
      restaurantName.includes(searchTerm) ||
      city.includes(searchTerm) ||
      company.includes(searchTerm)
    ) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};

const searchParameters = () => {
  const restaurantRows = document.querySelectorAll('.restaurant-row');
  const restaurantData = [];

  restaurantRows.forEach((row) => {
    const restaurantNameElem = row.querySelector('.restaurant-name');
    const restaurantCityElem = row.querySelector('.restaurant-city');
    const restaurantCompanyElem = row.querySelector('.restaurant-company');

    const rowInfo = {
      row,
      restaurantName: restaurantNameElem
        ? restaurantNameElem.textContent.toLowerCase()
        : '',
      city: restaurantCityElem
        ? restaurantCityElem.textContent.toLowerCase()
        : '',
      company: restaurantCompanyElem
        ? restaurantCompanyElem.textContent.toLowerCase()
        : '',
    };
    restaurantData.push(rowInfo);
  });
  return restaurantData;
};

export {searchBarHandler, createSearchBarElements};
