const LocalStrategy = require('passport-local').Strategy


// defined a verify strategy, 'name' is an idenfication
const localStrategy = new LocalStrategy(
    /**
     * @param username
     * @param password 
     * @param done 
     */
    function (username, password, done) {
      var test = username;
      return done(null, true, 'login sucess')
    }
  )

module.exports = localStrategy;

