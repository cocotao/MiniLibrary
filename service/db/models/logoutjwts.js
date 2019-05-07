// User Schema defination
const mongoose = require('../db');

var Schema = mongoose.Schema;

const BooksSchema = new Schema({
  token: { type: String, default: 1024}
});

module.exports = mongoose.model('logoutjwts', BooksSchema);