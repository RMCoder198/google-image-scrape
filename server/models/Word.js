const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const wordSchema = new Schema({
  word:
  {
    type:String,
    unique:true
  }
  });

module.exports = Word = mongoose.model('words', wordSchema);