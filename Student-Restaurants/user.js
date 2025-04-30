'use strict';

import {langDDHandler} from './assets/scripts/components/lang-icons.js';
import {logoutButtonHandler} from './assets/scripts/components/logout.js';
import {handleLanguageChange} from './assets/scripts/components/translate-page.js';
import {
  validatePassword,
  validateUsername,
} from './assets/scripts/lib/validations.js';
import {updateUIForLoggedInUser} from './assets/scripts/view/user-profile-elements.js';

const getUserName = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.username : null;
};

const getUserInfoElements = () => {
  const userDataElems = {
    username: document.querySelector('#current-username'),
    email: document.querySelector('#current-email'),
  };
  return userDataElems;
};

const getUserInfo = () => {
  const userDataElems = getUserInfoElements();

  const user = JSON.parse(localStorage.getItem('user'));
  const userData = user ? user : null;

  if (userData) {
    console.log(userData.username);
    console.log(userData.email);
    userDataElems.username.textContent = userData.username;
    userDataElems.email.textContent = userData.email;
  } else {
    console.error('User data not found in localStorage.');
  }
};

const changeUserName = async (newName) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user ? user.user_id : null;
  const token = localStorage.getItem('token');
  console.log('id', id);
  console.log('token', token);

  if (!token) {
    console.error('Token not found in localStorage.');
    return;
  }

  try {
    const response = await fetch(
      `https://10.120.32.74/web-page/api/v1/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({username: newName}),
      }
    );
    console.log('username', newName, response.ok);

    if (!response.ok) {
      throw new Error(`Failed to update username: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('data', data);
    localStorage.setItem('user', JSON.stringify(data));
    getUserInfo();
  } catch (error) {
    console.error('Error updating username:', error);
  }
};

const userNameHandler = () => {
  const saveChanges = document.querySelector('#save-username-button');

  saveChanges.addEventListener('click', async (event) => {
    event.preventDefault();
    const newName = document.querySelector('#username').value;

    if (!validateUsername(newName)) {
      alert('Invalid username format');
      return;
    }
    await changeUserName(newName);
    updateUIForLoggedInUser();
    alert('Username updated successfully');
  });
};

const deleteUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user ? user.user_id : null;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found in localStorage.');
    return;
  }

  const response = await fetch(
    `https://10.120.32.74/web-page/api/v1/users/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', false);
    alert('User deleted successfully');
    window.location.href = './index.html';
  } else {
    console.error('Error deleting user:', response.statusText);
  }
};

const changePassword = async (newPassword, currentPassword) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user ? user.user_id : null;
  const token = localStorage.getItem('token');
  console.log('token', token);
  console.log('id', id);

  if (!token) {
    console.error('Token not found in localStorage.');
    return;
  }

  try {
    const response = await fetch(
      `https://10.120.32.74/web-page/api/v1/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({currentPassword, newPassword}),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update password: ${response.statusText}`);
    }
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    alert('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
  }
};

const changePasswordHandler = () => {
  const saveChanges = document.querySelector('#save-password-button');

  saveChanges.addEventListener('click', async (event) => {
    event.preventDefault();
    const currentPassword = document
      .querySelector('#current-password')
      .value.trim();
    const newPassword = document.querySelector('#new-password').value.trim();
    const confirmPassword = document
      .querySelector('#confirm-password')
      .value.trim();

    console.log('password', currentPassword);
    console.log('newPassword', newPassword);
    console.log('confirmPassword', confirmPassword);

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }
    console.log('validatePassword result:', validatePassword(newPassword));

    if (validatePassword(newPassword)) {
      await changePassword(newPassword, currentPassword);
      alert('Password updated successfully');
      window.location.reload();
    } else {
      alert(
        'Password must be at least 5 characters long and contain at least one letter and one number'
      );
    }
  });
};

const initialize = () => {
  langDDHandler();
  handleLanguageChange();
  userNameHandler();
  changePasswordHandler();
  getUserInfo();
  updateUIForLoggedInUser();

  logoutButtonHandler('#profile-logout-button', '#profile-info-logout-button');

  const deleteButton = document.querySelector('#delete-account-button');
  if (deleteButton) {
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const confirmDelete = confirm(
        'Are you sure you want to delete your account?'
      );
      if (confirmDelete) {
        await deleteUser();
      }
    });
  }
};

initialize();
