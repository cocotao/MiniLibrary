
// User Schema defination
const mongoose = require('../db');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: 30}, 
  password: { type: String, default: 30 }, 
});

const User = module.exports = mongoose.model('User', UserSchema);