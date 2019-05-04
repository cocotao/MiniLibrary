
// User Schema defination
const mongoose = require('../db');

var Schema = mongoose.Schema;

const BooksSchema = new Schema({
  title: { type: String, default: 1024}, 
  description: { type: String, default: 1024 }, 
  count: { type: Number, default: 0, min: 0, max: 1024 }, 
});

module.exports = mongoose.model('Books', BooksSchema);