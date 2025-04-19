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
      const searchInput = createSearchBar();

      const handleEscKey = (event) => {
        if (event.key === 'Escape') {
          searchInput.remove();
          asideHeaderHElem.style.display = 'block';
          document.removeEventListener('keydown', handleEscKey);
        }
      };

      document.addEventListener('keydown', handleEscKey);

      asideWrapper.insertBefore(searchInput, asideHeaderHElem);
      asideHeaderHElem.style.display = 'none';
    }
  });
};

export {searchBarHandler, createSearchBarElements};
