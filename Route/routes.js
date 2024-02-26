const express = require('express');
const router = express.Router();


router.get('/get', (req, res) => {
    res.json("get method used sucessfully")
  })
router.post('/post', (req, res) => {
    res.json('post method used sucessfully')
  });
router.put('/put', (req, res) => {
    res.json('put method used sucessfully')
  });
 router.delete('/delete', (req, res) => {
    res.json('delete method used sucessfully')
  });


module.exports = {router};
