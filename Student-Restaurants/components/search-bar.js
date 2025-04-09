'use strict';

const createSearchBarElements = () => {
  const searchElements = {
    asideHeader: document.querySelector('.sidebar-header'),
    asideHeaderHElem: document.querySelector('.sidebar-header h2'),
    asideHeaderImg: document.querySelector('.sidebar-header img'),
    asideSeparator: document.querySelector('.sidebar-separator'),
  };
  return searchElements;
};

const createSearchBar = () => {
  const searchInput = document.createElement('input');
  searchInput.className = 'search-input';
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search for restaurants');

  return searchInput;
};

const createCloseIcon = () => {
  const closeIcon = document.createElement('span');
  closeIcon.id = 'close-icon';
  closeIcon.innerHTML = '&#10005;';
  closeIcon.fontSize = '14px';

  return closeIcon;
};

const searchBarHandler = (elements) => {
  if (!elements) {
    return;
  }

  const {asideHeader, asideHeaderHElem, asideSeparator, asideHeaderImg} =
    elements;

  asideHeaderImg.addEventListener('click', () => {
    if (!asideHeader.querySelector('.search-input')) {
      const searchInput = createSearchBar();
      const closeIcon = createCloseIcon();

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
};

export {searchBarHandler, createSearchBarElements};
