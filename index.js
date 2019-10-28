// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db')

server.use(express.json());

//initial GET
server.get('/', (req, res) => {
  res.send('Daily Challenge Node API 1!');
});

//GETs all users
server.get('/api/users', (req, res) => {
  db.find()
  .then((users) => {
    res.status(201).json(users)
  })
  .catch((err) => {
    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
  })
})

server.listen(8000, () => {
  console.log('\n**Here comes the data!**\n')
})