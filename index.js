const express = require('express');
const path = require('path');
const data = require('./public/data/dict.json');

const app = express();

const PORT = process.env.PORT || 3000;

//app.use(express.json());
//app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname, 'public','views'))
app.set('view engine', 'pug');


//app.get("/", (req, res) => {
 //   res.set({
 //       "Allow-access-Allow-Origin": "*",
 //   });
 //
 //   res.sendFile(path.join(__dirname,'public','index.html'));
//});

app.get('/', (req, res) => {
    res.render('home', {
      title: 'dnata Acronym Dictionary',
    });
  });

  app.get('/search', (req, res) => {
    const searchTerm = req.query.search;
    console.log(req.query.search);
    const results = data.filter(item => item.code === searchTerm);
  
    console.log(results);
    res.render('home', { results });
  });


app.listen(PORT, () => {
    console.log(`The Server started successfully on port ${PORT}`);
});