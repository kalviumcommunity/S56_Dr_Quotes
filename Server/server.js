const express = require('express');
const mongoose = require('mongoose');
const DrQuote = require('./Models/users.js');
const cors = require('cors');
const app = express();
const { validateAddQuote, validateUpdateQuote } = require('./validator'); // Import validator functions
require('dotenv').config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

// Route to fetch all quotes
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await DrQuote.find();
    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a new quote
app.post('/api/add-quotes', async (req, res) => {
  try {
    const newQuote = req.body;
    // Validate the incoming data using the validateAddQuote function
    const validationResult = validateAddQuote(newQuote);
    if (validationResult.error) {
      console.error('Validation error:', validationResult.error.message);
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }
    const createdQuote = await DrQuote.create(newQuote);
    res.status(201).json(createdQuote);
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to fetch a specific quote by ID
app.get('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    const quote = await DrQuote.findById(quoteId); // Using findById 
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to update a quote
app.put('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    const updatedQuoteData = req.body;
    // Validate the incoming data using the validateUpdateQuote function
    const validationResult = validateUpdateQuote(updatedQuoteData);
    if (validationResult.error) {
      console.error('Validation error:', validationResult.error.message);
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }
    const updatedQuote = await DrQuote.findByIdAndUpdate(quoteId, updatedQuoteData, { new: true });
    if (!updatedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(updatedQuote);
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete a quote
app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;

    const deletedQuote = await DrQuote.findByIdAndDelete(quoteId);
    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
