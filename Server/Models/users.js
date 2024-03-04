const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  profession: String,
  birthdate: String,
  deathdate: String,
  interestingFact: String,
  profileimg: String
});

const drQuoteSchema = new mongoose.Schema({
  id: String,
  content: String,
  speaker: String,
  date: String,
  category: String,
  rating: Number,
  numRatings: Number,
  author:authorSchema
});


const DrQuote = mongoose.model('quotes-colles', drQuoteSchema);

module.exports = DrQuote;
