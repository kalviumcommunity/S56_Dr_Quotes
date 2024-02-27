const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
  try {
    //  code to handle GET request
    res.json("get method used successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/post', (req, res) => {
  try {
    //  code to handle POST request
    res.json('post method used successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/put', (req, res) => {
  try {
    //  code to handle PUT request
    res.json('put method used successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete', (req, res) => {
  try {
    //  code to handle DELETE request
    res.json('delete method used successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { router };
