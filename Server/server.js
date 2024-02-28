const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loading environment variables
const { router } = require('./Route/routes.js');

const app = express();
const port = process.env.PORT || 3000;

// Async function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}


// Connect to MongoDB
connectToMongoDB();

// Function to check MongoDB connection status
function isConnected() {
  const { readyState } = mongoose.connection;
  return readyState === 1;
}

// Routes
app.use(router);

// Route to check MongoDB connection status
app.get('/', async (req, res) => {
  const dbStatus = isConnected() ? 'Connected' : 'Disconnected';
  res.send(`Database Connection Status: ${dbStatus}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
