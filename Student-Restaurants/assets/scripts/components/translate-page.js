'use strict';
import {translations} from '../lib/translations.js';

const translatePage = (lang) => {
  const elementsToTranslate = {
    '.meals-header': 'meals',
    '.price-header': 'price',
    '.diets-header': 'diets',
    '.register-prompt': 'registerPrompt',
    '.welcome-text': 'welcomeText',
    '.placeholder-text': 'placeholderMenuText',
    '.page-title': 'header',
    '#home-link': 'home',
    '#login-link': 'signIn',
    '#register-link': 'register',
    '#logout-link': 'signOut',
    '.sidebar-title': 'restaurants',
    '.all-label': 'all',
    '.res-name': 'name',
    '.res-loc': 'location',
    '.res-comp': 'company',
    '.weekly-menu': 'weeklyMenu',
    '.register-text': 'registerPrompt',
    '.register-button': 'register',
    '.sign-in-button': 'signIn',
    '.footer-text': 'footerText',
    '#all-option': 'all',
    '.sign-in-heading': 'signIn',
    '.register-heading': 'register',
    '#register-button': 'register',
    '.register-paragraph': 'registerParagraph',
    '.register-link': 'register',
    '.login-link': 'login',
    '.label-name': 'labelName',
    '.label-username': 'labelUsername',
    '.label-email': 'labelEmail',
    '.label-password': 'labelPassword',
    '.label-confirm-password': 'labelConfirmPassword',
    '.account-text': 'signInParagraph',
    '.no-meals': 'noMeals',
  };

  Object.entries(elementsToTranslate).forEach(([selector, key]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerText = translations[lang][key] || translations.en[key];
    }
  });

  const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  weekDays.forEach((day) => {
    const dayElement = document.querySelector(`.calendar-day[title="${day}"]`);
    if (dayElement) {
      dayElement.textContent = translations[lang][day];
    }
  });
};

const handleLanguageChange = () => {
  const langDropdown = document.querySelector('.lang-dropdown');
  const currentFlag = document.getElementById('lang-icon');

  if (!langDropdown || !currentFlag) {
    console.warn('Language dropdown or icon not found in the DOM');
    return;
  }

  langDropdown.addEventListener('click', (event) => {
    const selectedLang = event.target.getAttribute('title');
    if (selectedLang === 'English' || selectedLang === 'Finnish') {
      const langCode = selectedLang === 'English' ? 'en' : 'fi';
      const flagCode = langCode === 'en' ? 'gb' : 'fi';

      currentFlag.className = `fi fi-${flagCode}`;

      localStorage.setItem('lang', langCode);

      translatePage(langCode);

      langDropdown.style.display = 'none';
    }
  });
};

export {translatePage, handleLanguageChange};
