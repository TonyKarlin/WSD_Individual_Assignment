'use strict';

const hideHomeElements = () => {
  const elemsToHide = [
    document.querySelector('.image-container'),
    document.querySelector('.content'),
    document.querySelector('.main-button-container'),
    document.querySelector('.main-container h1'),
  ];

  elemsToHide.forEach((element) => {
    element.style.display = 'none';
  });
};

export {hideHomeElements};
