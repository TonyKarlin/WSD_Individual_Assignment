'use strict';

import {getLangElements, langSpan} from '../view/lang-elements.js';

const languages = [
  {name: 'English', code: 'gb'},
  {name: 'Finnish', code: 'fi'},
  {name: 'Swedish', code: 'se'},
];

// Function to change the language and update the flag icon
const changeLanguage = (currentFlag, newLang) => {
  if (currentFlag.className !== `fi fi-${newLang}`) {
    currentFlag.className = `fi fi-${newLang}`;

    // Refresh the dropdown to reflect the new current language
    const dropDown = document.querySelector('.lang-dropdown');
    dropDown.innerHTML = ''; // Clear existing items
    createDDItems(currentFlag, dropDown); // Recreate items
  }
};

const createDDItems = (currentFlag, dropDown) => {
  languages.forEach(({name, code}) => {
    if (currentFlag.className.includes(`fi fi-${code}`)) {
      return;
    }
    const span = langSpan({name, code});

    span.addEventListener('click', () => {
      changeLanguage(currentFlag, code);
      dropDown.style.display = 'none';
    });

    dropDown.appendChild(span);
  });
};

// Function to handle dropdown behavior
const langDDHandler = () => {
  const {currentFlag, langCon, dropDown} = getLangElements();

  if (!langCon || !dropDown || !currentFlag) {
    console.error('Lang DD is missing elements!');
    return;
  }

  // Populate the dropdown with language options
  createDDItems(currentFlag, dropDown);

  // Add click event to toggle dropdown visibility
  langCon.addEventListener('click', () => {
    dropDown.style.display =
      dropDown.style.display === 'none' ? 'block' : 'none';
  });

  // Add click event to close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!langCon.contains(event.target)) {
      dropDown.style.display = 'none';
    }
  });
};

export {langDDHandler};
