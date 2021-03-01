const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// const router = express.Router();

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//Beers
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersArray => {
      // console.log(beersArray);
      res.render('beers.hbs', { listOfBeers: beersArray });
      console.log('Beers imported!');
    })
    .catch(err => console.log(err));
});

//Random beer

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();

  randomBeer
    .then(randBeer => {
      res.render('random-beer.hbs', {beer: randBeer});
      console.log(randBeer);
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
