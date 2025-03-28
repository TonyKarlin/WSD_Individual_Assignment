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
