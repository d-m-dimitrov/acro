const express = require('express');
const path = require('path');
const axios = require('axios');

const fileUrl = `https://www.dropbox.com/s/7orr4x3t60n4fcf/dict.json?raw=1`;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'dnata Acronym Dictionary',
  });
});

app.get('/search', (req, res) => {
  const searchTerm = req.query.search.toUpperCase();
  console.log(searchTerm);
  axios.get(fileUrl, {
      responseType: 'text'
    })
    .then(response => {
      const jsonData = JSON.parse(response.data);
      const results = Array.isArray(jsonData) ? jsonData.filter(item => item.code.toUpperCase().includes(searchTerm)) : [];
      console.log(results);
      res.render('home', {
        results
      });
    })
    .catch(error => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`The Server started successfully on port ${PORT}`);
});
