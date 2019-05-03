const jwt = require('jsonwebtoken')
const secret = 'jwt demo'

/**
 * !! Note !!
 * when I use require(passport-jwt).Strategy as JWTStragy and add it into passport, it could be work, 
 * I don't know the reason (guess may be not compatitable with KOA2 ), but I haven't enough time to 
 * do research, so just defined a simple jwt verify stragy here currently.
 */

// defined a verify strategy, 'name' is an idenfication
const jwtStrategy = {
    name: 'jwt',
    authenticate: function (ctx) {
        const token = ctx.header.authorization // get jwt token from header
        let payload
        if (token) {
            payload = jwt.verify(token.split(' ')[1], secret) // decode jwt token and get payload
            this.success(payload)
        } else {
            this.fail(401)
        }
    }
}

module.exports = jwtStrategy;