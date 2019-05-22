const User = require('../db/models/user');
const LogoutJwts = require('../db/models/logoutjwts')

const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNTS = 3;

module.exports.getAllUsers = function() {
  return User.find({});
};

module.exports.createNewUser = async function(name, password) {
  // bcrypt: auto-gen a salt and hash (sync way)
  passwordHash = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNTS)
  if (passwordHash) {
    const user = new User({
      name: name,
      password: passwordHash
    });
    return user.save();
  }
};

module.exports.updateUserById = function(id, name, password) {
  const updateStr = {
    name: name,
    password: password
  };
  return User.findByIdAndUpdate({ '_id': id }, updateStr);
};

module.exports.searchUserById = function(id) {
  return User.findOne({ '_id': id }, '_id name password');
};

module.exports.searchUserByName = function(name) {
  return User.findOne({ 'name': name }, '_id name password');
};

module.exports.searchUserByNameAndPassword = function(name, password) {
  return User.findOne({ 'name': name , 'password': password }, '_id name password');
};

module.exports.deleteUserById = function(id) {
  const whereid = { '_id': id };
  return User.remove(whereid);
};

module.exports.logoutJwtSave = function(token) {
  const logoutToken = new LogoutJwts({
    token: token
  });
  return logoutToken.save();
};

module.exports.logoutJwtSearch = function(token) {
  return LogoutJwts.findOne({'token' : token});
};
