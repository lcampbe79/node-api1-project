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
    res.status(400).json({errorMessage: "The users information could not be retrieved." })
  })
})

//Adds new user

server.post('/api/users', (req, res) => {
  
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
  }

  db.insert(userInfo)
  .then(users => {
    res.status(201).json(users)
  })
  .catch((err) =>{
    res.status(500).json({errorMessage: "Error saving user" })
  })
})

server.listen(8000, () => {
  console.log('\n**Here comes the data!**\n')
})