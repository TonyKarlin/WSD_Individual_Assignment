'use strict';

import {getLangElements, langSpan} from '../view/lang-elements.js';

const languages = [
  {name: 'English', code: 'gb'},
  {name: 'Finnish', code: 'fi'},
];

const changeLanguage = (currentFlag, newLang) => {
  if (currentFlag.className !== `fi fi-${newLang}`) {
    currentFlag.className = `fi fi-${newLang}`;

    const dropDown = document.querySelector('.lang-dropdown');
    dropDown.innerHTML = '';
    createDDItems(currentFlag, dropDown);
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

const langDDHandler = () => {
  const {currentFlag, langCon, dropDown} = getLangElements();

  if (!langCon || !dropDown || !currentFlag) {
    console.error('Lang DD is missing elements!');
    return;
  }

  createDDItems(currentFlag, dropDown);

  langCon.addEventListener('click', () => {
    dropDown.style.display =
      dropDown.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', (event) => {
    if (!langCon.contains(event.target)) {
      dropDown.style.display = 'none';
    }
  });
};

export {langDDHandler};
