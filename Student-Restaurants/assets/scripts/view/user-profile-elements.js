'use strict';

import {personalizeUserImg} from '../components/loggedin-view.js';

const updateUIForLoggedInUser = () => {
  const loginLink = document.querySelector('.account-links');
  const userProfile = document.querySelector('.user-profile');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  console.log('isLoggedIn', isLoggedIn);
  console.log('userProfile', userProfile);
  console.log('loginLink', loginLink);

  if (isLoggedIn) {
    if (userProfile) {
      userProfile.style.display = 'flex';
    }
    if (loginLink) {
      loginLink.style.display = 'none';
    }
    personalizeUserImg();
  }
};

export {updateUIForLoggedInUser};
