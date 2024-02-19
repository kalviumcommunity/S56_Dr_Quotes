// server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
  res.send('Ping');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
