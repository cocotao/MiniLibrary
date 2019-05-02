const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../db/models/user')

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

const jwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});

// const jwtStrategy = {
//     name: 'jwt',
//     // 策略的主体就是authenticate(req)函数，在成功的时候返回用户身份，失败的时候返回错误
//     authenticate: function (req) {
//       let uid = req.query.uid
//       if (uid) {
//         // 策略很简单，就是从参数里获取uid，然后组装成一个user
//         let user = {
//           id: parseInt(uid),
//           name: 'user' + uid
//         }
//         this.success(user)
//       } else {
//         // 如果找不到uid参数，认为鉴权失败
//         this.fail(401)
//       }
//     }
// };

module.exports = jwtStrategy;