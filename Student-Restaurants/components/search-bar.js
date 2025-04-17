'use strict';

const createSearchBarElements = () => {
  const searchElements = {
    asideHeader: document.querySelector('.sidebar-header'),
    asideHeaderHElem: document.querySelector('.sidebar-header h2'),
    asideHeaderImg: document.querySelector('.search-img-container'),
  };
  return searchElements;
};

const createSearchBar = () => {
  const searchInput = document.createElement('input');
  searchInput.className = 'search-input';
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search for restaurants   (Esc)');

  return searchInput;
};

// const createCloseIcon = () => {
//   const closeIcon = document.createElement('span');
//   closeIcon.id = 'close-icon';
//   closeIcon.innerHTML = '&#10005;';
//   closeIcon.fontSize = '14px';

//   return closeIcon;
// };

const searchBarHandler = (elements) => {
  if (!elements) {
    return;
  }

  const {asideHeader, asideHeaderHElem, asideHeaderImg} = elements;

  asideHeaderImg.addEventListener('click', () => {
    if (!asideHeader.querySelector('.search-input')) {
      const searchInput = createSearchBar();

      const handleEscKey = (event) => {
        if (event.key === 'Escape') {
          searchInput.remove();
          asideHeaderHElem.style.display = 'block';
          document.removeEventListener('keydown', handleEscKey);
        }
      };

      document.addEventListener('keydown', handleEscKey);

      asideHeader.insertBefore(searchInput, asideHeaderHElem);
      asideHeaderHElem.style.display = 'none';
    }
  });
};

export {searchBarHandler, createSearchBarElements};
