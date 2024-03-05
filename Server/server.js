const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loading environment variables
const DrQuote = require('./Models/users.js');
const cors = require('cors');
const app = express();
// uisng cors middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

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

// Route to add a new quote to the Dr_Quotes collection
app.post('/api/add-quotes', async (req, res) => {
  try {
    const newQuote = req.body;
    const createdQuote = await DrQuote.create(newQuote);
    res.status(201).json(createdQuote);
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
