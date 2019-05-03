const passport = require('koa-passport')

passport.serializeUser(function (user, done) {
    // 序列化的结果只是一个id
    done(null, user.name)
})

passport.deserializeUser(async function (str, done) {
    // 根据id恢复用户
    done(null, {
        username: parseInt(str),
        name: 'user' + str
    })
})


module.exports = passport;