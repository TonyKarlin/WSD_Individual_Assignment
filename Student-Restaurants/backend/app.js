'use strict';

import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// app.get('/api/v1/cat', (req, res) => {
//   const cat = {
//     cat_id: 1,
//     name: 'Whiskers',
//     birthdate: '2020-05-15',
//     weight: 4.5,
//     owner: 'John Doe',
//     image: 'https://loremflickr.com/320/240/cat',
//   };
//   res.json(cat);
// });

app.use('/public', express.static('public'));
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
