const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loading environment variables
const DrQuote = require('./Models/users.js');
const cors = require('cors');
const app = express();
// uisng cors middleware
app.use(cors());

const port = process.env.PORT || 3000;

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

// Route to fetch quotes from Dr_Quotes collection
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await DrQuote.find();
    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
