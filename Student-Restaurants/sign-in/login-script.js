const elements = document.querySelectorAll('.logo img, h1');

elements.forEach((element) => {
  element.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
});
