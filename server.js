const express = require('express');
const logger = require('morgan');


const app = express();
app.use(logger('dev'));

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
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

app.listen(3000, () => {
  console.log('I am listening')
})

