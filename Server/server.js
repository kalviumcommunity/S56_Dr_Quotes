const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loading environment variables
const DrQuote = require('./Models/users.js');
const cors = require('cors');
const { addQuoteSchema, updateQuoteSchema } = require('./validator.js'); // Importing the validation schemas
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

// Route to add a new quote to the Dr_Quotes collection
app.post('/api/add-quotes', async (req, res) => {
  try {
    const newQuote = req.body;

    // Validating the request body
    const { error } = addQuoteSchema.validate(newQuote);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const createdQuote = await DrQuote.create(newQuote);
    res.status(201).json(createdQuote);
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to update a specific quote by ID in the Dr_Quotes collection
app.put('/api/quotes/:id', async (req, res) => {
  try {
    const quoteId = req.params.id;
    const updatedQuoteData = req.body;

    // Validate the request body
    const { error } = updateQuoteSchema.validate(updatedQuoteData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

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

// Route to delete a specific quote by ID from the Dr_Quotes collection
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
