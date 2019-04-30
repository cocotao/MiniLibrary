

var mongoose = require('mongoose');
var dbConnectConfig = require('../db/config');
var DB_URL = (process.env.NODE_ENV === 'production') ? dbConnectConfig.production : dbConnectConfig.development;

/* 链接 */
mongoose.connect(DB_URL);

/* 链接成功 */
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL);
});

// 链接异常
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error:' + err);
});

// 链接断开

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

// var dbConnect = function (uri) {
//   return new Promise(function(resolve, reject) {
//     mongoose.connection
//       .on('error', function(error) {
//         reject(error, new Date());
//       })
//       .on('close', function(error) {
//         console.log('Database connection closed.');
//       })
//       .once('open', function(error) {
//         resolve(mongoose.connections[0]);
//       });

//     mongoose.connect(uri);
//   });
// };


module.exports = mongoose;



