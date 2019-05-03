const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'jwt demo';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

const passportJwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
  const test = "test";
  const id = jwt_payload.name;
  done(null, id)
})

module.exports = passportJwtStrategy;