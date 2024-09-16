// implement your API here
require('dotenv').config();

const express = require('express');
console.log(`\n message:`, process.env.MSG)
const server = express();

const db = require('./data/db')

server.use(express.json());

//initial GET
server.get('/', (req, res) => {
  res.status(200).json({message: process.env.MSG});
});

//GETs all users
server.get('/api/users', (req, res) => {
  db.find()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    res.status(500).json({errorMessage: "The users information could not be retrieved." })
  })
})

//GETs user by id
server.get('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.findById(id)
  .then(user => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    }
  })
  .catch((err) => {
    res.status(500).json({errorMessage: "The users information could not be retrieved." })
  });
});

//Adds new user
server.post('/api/users', (req, res) => {
  
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    return
  }

  db.insert(userInfo)
  .then(users => {
    //console.log(users)
    db.findById(users.id).then(updatedUser => {//this is the servers response
      res.json(updatedUser)
    })
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

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
  .then(user => {
    if (user) {
      res.status(200).json({message: `User at id ${id} was removed!`})
    } else {
      res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "The user could not be removed."})
  })
})

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`\n**Here comes the data on ${port}!**\n`)
})