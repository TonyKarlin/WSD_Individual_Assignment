'use strict';

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');

  window.location.href = 'login.html';
};

const logoutButtonHandler = (...selectors) => {
  selectors.forEach((selector) => {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const confirmLogout = confirm('Are you sure you want to log out?');
        if (confirmLogout) {
          logout();
        }
      });
    });
  });
};

export {logout, logoutButtonHandler};
