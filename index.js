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

//GETs user by id
server.get('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.findById(id)
  .then(user => {
    if (user) {
      res.status(201).json(user)
    } else {
      res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    }
  })
})

//Adds new user
server.post('/api/users', (req, res) => {
  
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    return
  }

  db.insert(userInfo)
  .then(users => {
    res.status(201).json(users)
  })
  .catch((err) =>{
    res.status(500).json({errorMessage: "There was an error while saving the user to the database." })
  })
})

//Updates users
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (!user.id) {
    res.status(404).json({errorMessage: "The user with the specified ID does not exist." })
  } else {
    if (!user.name || !user.bio) {
      res.status(400).json({errorMessage: "Please provide name and bio for the user." })
      return
    }
  }

  db.update(id, user)
  .then(updatedUser => {
    db.findById(id).then(updatedUser => {
      res.json(updatedUser)
    })
  })
  .catch(err => {
    res.status(500).json({errorMessage: "The user information could not be modified."})
  })
})

server.listen(8000, () => {
  console.log('\n**Here comes the data!**\n')
})