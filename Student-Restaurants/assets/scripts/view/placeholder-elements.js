'use strict';

export const hidePlaceholders = () => {
  const placeholderText = document.querySelector('.placeholder-text');
  const signupText = document.querySelector('.main-button-container');
  placeholderText?.remove();
  signupText?.remove();
};
