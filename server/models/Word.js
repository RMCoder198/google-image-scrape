const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const wordSchema = new Schema({
  word:String,
  images:Array
});

module.exports = Word = mongoose.model('words', wordSchema);