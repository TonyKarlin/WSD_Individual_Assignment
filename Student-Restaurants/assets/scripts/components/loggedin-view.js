'use strict';

const handleUserNameDisplay = () => {
  const userNameContainer = document.querySelector('.user-name');

  const userNameElement = document.createElement('h2');
  userNameElement.classList.add('user-name-element');
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.username : null;
  userNameElement.textContent = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1)
    : 'User';
  userNameContainer.style.display = 'block';
  userNameContainer.appendChild(userNameElement);

  return userName;
};

const personalizeUserImg = () => {
  const userName = handleUserNameDisplay();
  if (userName) {
    const hElement = document.createElement('h2');
    const firstLetter = userName.trim().charAt(0).toUpperCase();

    const userImgContainer = document.querySelector('.user-img-container');
    userImgContainer.innerHTML = '';

    hElement.textContent = firstLetter;
    userImgContainer.appendChild(hElement);

    const userNameContainer = document.querySelector('.user-name');
    userNameContainer.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });

    userImgContainer.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
  } else {
    console.error('Element with class "user-name" not found.');
  }
};

export {personalizeUserImg};
