import {langDDHandler} from './assets/scripts/components/lang-icons.js';
import {
  handleLanguageChange,
  translatePage,
} from './assets/scripts/components/translate-page.js';

const elements = document.querySelectorAll('.logo img, h1');

elements.forEach((element) => {
  element.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
});

const registrationForm = document.querySelector('.register-form');

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  return passwordPattern.test(password);
};
const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
  return usernamePattern.test(username);
};

const registerUser = () => {
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const userData = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    };

    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!validateEmail(userData.email)) {
      alert('Invalid email format');
      return;
    }
    if (!validatePassword(userData.password)) {
      alert(
        'Password must be at least 5 characters long and contain at least one letter and one number'
      );
      return;
    }
    if (!validateUsername(userData.username)) {
      alert(
        'Username must be at least 3 characters long and contain only letters and numbers'
      );
      return;
    }

    try {
      // fetch('http://127.0.0.1:3000/api/v1/users')
      //   .then((response) => response.json())
      //   .then((users) => {
      //     console.log(users);
      //   })
      //   .catch((error) => {
      //     console.error('Error fetching users:', error);
      //   });

      const response = await fetch(
        'https://10.120.32.74/web-page/api/v1/users',
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
        console.log('data', data);

        if (data.result && data.result.id) {
          localStorage.setItem('userId', data.result.id);
          localStorage.setItem('user', JSON.stringify(data.result));
        } else {
          console.error('User data is missing in the response:', data);
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', true);

        console.log('Registration successful:', data);
        alert('Registration successful!');
        window.location.href = './login.html';
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
      return;
    }

    alert('Registration successful!');
  });
};

const initialize = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    translatePage(savedLang);
  });
  handleLanguageChange();
  langDDHandler();
  registerUser();
};

initialize();
