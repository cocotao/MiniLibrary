const passport = require('koa-passport')

// not need to serializeUser
/*
passport.serializeUser(function (user, done) {
   
    done(null, user.name)  // use user's id to serialize
})
*/

// not need to deserializeUser
/*
passport.deserializeUser(async function (id, done) {
    done(null, {
        username: parseInt(id), // use user's id to serialize
        name: 'user' + id
    })
})
*/


module.exports = passport;