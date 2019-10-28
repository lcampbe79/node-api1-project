// implement your API here
const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Daily Challenge Node API 1!');
});

server.listen(8000, () => {
  console.log('\n**Here comes the data!**\n')
})