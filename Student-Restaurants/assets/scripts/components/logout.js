'use strict';

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');

  window.location.href = 'login.html';
};

export {logout};
