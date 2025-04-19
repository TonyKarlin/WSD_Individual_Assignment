'use strict';

const getLangElements = () => {
  return {
    currentFlag: document.querySelector('#lang-icon'),
    langCon: document.querySelector('.lang'),
    dropDown: document.querySelector('.lang-dropdown'),
  };
};

const langSpan = ({name, code}) => {
  const span = document.createElement('span');
  span.className = `fi fi-${code}`;
  span.title = name;
  span.style.cursor = 'pointer';
  return span;
};

export {getLangElements, langSpan};
