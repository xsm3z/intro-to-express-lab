const express = require('express');
const logger = require('morgan');


const app = express();
app.use(logger('dev'));

app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}.`)
})

app.get('/roll/:number', (req, res) => {
  const number = (req.params.number);
  const roll = Math.floor(Math.random());
  if (isNaN(number)) {
    res.send('You must specify a number');
  } else {
    res.send(`You rolled a ${roll}.`)
  }
})

app.listen(3000, () => {
  console.log('I am listening')
})
