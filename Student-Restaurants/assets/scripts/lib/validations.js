'use strict';

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  return passwordRegex.test(password);
};
const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z0-9]{3,8}$/;
  return usernamePattern.test(username);
};

export {validateEmail, validatePassword, validateUsername};
