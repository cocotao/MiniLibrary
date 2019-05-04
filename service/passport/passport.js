const passport = require('koa-passport')

// Needn't serializeUser and deserializeUser as session disabled
/*
passport.serializeUser(function (user, done) {
   
    done(null, user.name)  // use user's id to serialize
})

passport.deserializeUser(async function (id, done) {
    done(null, {
        username: parseInt(id), // use user's id to serialize
        name: 'user' + id
    })
})
*/


module.exports = passport;