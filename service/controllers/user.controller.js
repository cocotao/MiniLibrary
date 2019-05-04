const User = require('../db/models/user');

// TODO
// userName and password Validation()
// passwordHash()
// is user already exist()

module.exports.getAllUsers = function() {
  return User.find({});
};

module.exports.createNewUser = function(name, password) {
  const user = new User({
    name: name,
    password: password
  });
  return user.save();
};

// TODO:
module.exports.updateUserById = function(id, name, password) {
  const updateStr = {
    name: name,
    password: password
  };
  return User.findByIdAndUpdate({ '_id': id }, updateStr);
};

module.exports.searchUserById = function(id) {
  // return an array reslut
  // User.find({ '_id': id }, function (err, user) {
  //   if (err) return console.error(err);
  // }); 

  return User.findOne({ '_id': id }, '_id name password');
};

module.exports.searchUserByName = function(name) {
  // return an array reslut
  // User.find({ '_id': id }, function (err, user) {
  //   if (err) return console.error(err);
  // }); 

  return User.findOne({ 'name': name }, '_id name password');
};

module.exports.searchUserByNameAndPassword = function(name, password) {
  // return an array reslut
  // User.find({ '_id': id }, function (err, user) {
  //   if (err) return console.error(err);
  // }); 

  return User.findOne({ 'name': name , 'password': password }, '_id name password');
};

module.exports.DeleteUserById = function(id) {
  const whereid = { '_id': id };
  return User.remove(whereid);
};
