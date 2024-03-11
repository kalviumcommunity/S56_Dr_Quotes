const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loading environment variables
const DrQuote = require('./Models/users.js');
const cors = require('cors');
const app = express();
// Using cors middleware
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

// Route to fetch a specific quote by ID from the Dr_Quotes collection for update form.
app.get('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    const quote = await DrQuote.findById(quoteId); // Use findById directly with quoteId
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    const updatedQuoteData = req.body;
    
    // Update the quote in the database based on its _id
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
app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    
    // Delete the quote from the database based on its _id
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
