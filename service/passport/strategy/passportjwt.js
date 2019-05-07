const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'jwt demo';

const passportJwtStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
  const name = jwt_payload.name;
  done(null, name)
})

module.exports = passportJwtStrategy;