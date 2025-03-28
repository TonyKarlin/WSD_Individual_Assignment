const userImgContainer = document.querySelector('.user-img-container');
const hElement = document.createElement('h2');
const userName = document.querySelector('.user-name');

if (userName) {
  const firstLetter = userName.textContent.trim().charAt(0).toUpperCase();

  hElement.textContent = firstLetter;
  userImgContainer.appendChild(hElement);
} else {
  console.error('Element with class "user-name" not found.');
}

userImgContainer.addEventListener('click', () => {
  console.log('User image clicked');
  window.location.href = 'profile.html';
});

const logo = document.querySelector('.logo img');

logo.addEventListener('click', () => {
  console.log('Logo clicked');
  window.location.href = 'index.html';
});
