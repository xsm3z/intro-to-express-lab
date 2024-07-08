const express = require('express');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}.`)
});

app.get('/roll/:number', (req, res) => {
  const number = req.params.number;
  const roll = Math.floor(Math.random() * (number + 1));
  if (isNaN(number)) {
    res.send('You must specify a number.');
  } else {
    res.send(`You rolled a ${roll}.`)
  }
});

app.get('/collectibles/:index', (req, res) => {
  const index = req.params.index;
  const item = collectibles[index];
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send('This item is not yet in stock. Check back soon!');
  } else {
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
  }
});

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;
  if (req.query['min-price']) {
    const minPrice = parseFloat(req.query['min-price']);
    if (!isNaN(minPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
  }
  if (req.query['max-price']) {
    const maxPrice = parseFloat(req.query['max-price']);
    if (!isNaN(maxPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
  }
  if (req.query.type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query.type);
  }
  res.json(filteredShoes);
});

app.get('*', (req, res) => {
  res.status(404).send('this is not the page your looking for')
})

app.listen(3000, () => {
  console.log('I am listening')
})

