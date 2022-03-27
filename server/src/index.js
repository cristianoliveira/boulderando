const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Boulderando api');
});

app.get('/json', (req, res) => {
  res.json({ hello: 'world' });
});

server.listen(port, () => {
  // eslint-disable-next-line
  console.log('listening on:', port);
});

