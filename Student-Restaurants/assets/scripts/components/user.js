'use strict';

const getUserName = () => {
  return document.querySelector('.user-name');
};

function personalizeUserImg() {
  if (getUserName()) {
    const hElement = document.createElement('h2');
    const firstLetter = getUserName()
      .textContent.trim()
      .charAt(0)
      .toUpperCase();

    const userImgContainer = document.querySelector('.user-img-container');
    userImgContainer.innerHTML = '';

    hElement.textContent = firstLetter;
    userImgContainer.appendChild(hElement);

    userImgContainer.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
  } else {
    console.error('Element with class "user-name" not found.');
  }
}

export default personalizeUserImg;
