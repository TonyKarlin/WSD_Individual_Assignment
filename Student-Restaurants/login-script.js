import {langDDHandler} from './assets/scripts/components/lang-icons.js';
import {
  handleLanguageChange,
  translatePage,
} from './assets/scripts/components/translate-page.js';
import {
  validatePassword,
  validateUsername,
} from './assets/scripts/lib/validations.js';

const elements = document.querySelectorAll('.logo img, h1');

elements.forEach((element) => {
  element.addEventListener('click', () => {
    window.location.href = './index.html';
  });
});

const loginForm = document.querySelector('.login-form');

const handleLogin = () => {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    console.log('userData', userData);

    if (!validateUsername(userData.username)) {
      alert('Invalid email or username format');
      return;
    }

    if (!validatePassword(userData.password)) {
      alert(
        'Password must be at least 5 characters long and contain at least one letter and one number'
      );
      return;
    }

    try {
      const response = await fetch(
        'https://10.120.32.74/web-page/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', true);

        alert('Login successful');
        window.location.href = './index.html';
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Invalid email/username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  });
};

const initialize = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    translatePage(savedLang);
  });
  handleLanguageChange();
  langDDHandler();
  handleLogin();
};

initialize();
