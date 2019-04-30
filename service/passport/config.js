

var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
//const keys = require("../config/keys");
const keys = {
    secretOrKey : "13424214124124124"
};
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();  //通过配置信息来生成jwt的请求，验证这个token
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
 passport.use(new JwtStrategy(opts,function(jwt_payload,done){
    console.log(jwt_payload);
 }));
}

