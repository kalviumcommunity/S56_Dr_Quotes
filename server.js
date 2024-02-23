const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loading environment variables


const app = express();
const port = process.env.PORT || 3000;


// Connecting to MongoDB using the provided connection link
mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('Connected to MongoDB'))
 .catch((error) => {
   console.error('Error connecting to MongoDB:', error);
   process.exit(1); // Exit the process if MongoDB connection fails
 });


// Function to check MongoDB connection status
function isConnected() {
 const { readyState } = mongoose.connection;
 return readyState === 1;
}


app.get('/', async (req, res) => {
 const dbStatus = isConnected() ? 'Connected' : 'Disconnected';
 res.send(`Database Connection Status: ${dbStatus}`);
});


app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});



