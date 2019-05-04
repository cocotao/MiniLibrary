
// User Schema defination
const mongoose = require('../db');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: 30, required: true, index: true}, 
  password: { type: String, default: 512, required: true }, 
});

module.exports = mongoose.model('User', UserSchema);