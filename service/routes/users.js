const router = require('koa-router')()
const User = require('../controllers/user.controller')
const passport = require('../passport/passport')
const secret = 'jwt demo'
var jwt = require('jsonwebtoken');

router.prefix('/user')

/**
 * POST /user – create new user with provided name and password, should return JWT token
 */
router.post('/', passport.authenticate('jwt', {
  session: false
}), async function (ctx, next) {
  const userCreateResult = await User.createNewUser(ctx.request.body.username, ctx.request.body.password);
  if (userCreateResult) ctx.body = userCreateResult;
})

/**
 * POST /user/login – create new user with provided name and password, should return JWT token
 */
// use naive strategy to do passport authentication for '/user/login', not using session temporarily
router.post('/login', passport.authenticate('naive', {
  session: false 
}), async (ctx) => {
  const user = ctx.request.body
  if (user && user.username) {
    let token = generateJwtToken(user)
    ctx.body = {
      message: 'generate token success',
      code: 1,
      token
    }
  } else {
    ctx.body = {
      message: 'verify failed, please input correct user info',
      code: -1
    }
  }
})

// TODO: passport local strategy test
router.post('/aaa', passport.authenticate('local', {
  session: false 
}), async (ctx) => {
  ctx.body = {
    message: 'local startegy works fine'
  }
})

// TODO: passport passportJwt strategy test
router.post('/bbb', passport.authenticate('jwt', { session: false }), async (ctx) => {
  ctx.body = {
    message: 'passportJwt startegy works fine'
  }
})


generateJwtToken = function (user) {
    let userToken = {
      name: user.username
    }
    // TODO: secret could be enhanced?
    const token = jwt.sign(userToken, secret, {
      expiresIn: '1h'
    })
    return token;
}

/**
 * GET /api/user/logout – clear current JWT token and logout user (Optional)
 */
router.post('/logout', passport.authenticate('jwt', {session: false}), function (ctx, next) {
  // TODO: add jwt token to black list
  ctx.logout()
  ctx.body = {
    auth: ctx.isAuthenticated(),
    user: ctx.state.user
  }
})

/**
 * GET /api/user/:id/reservations (returns reserved books by the user)
 */
// use jwt strategy to do passport authentication for '/user/login', not using session temporarily
router.get('/:id/reservations', passport.authenticate('jwt', {session: false}), function(ctx, next) {
  // use passport.authenticate() will return 401 error directly, so the code wouldn't be used.
  // if (ctx.isAuthenticated()) {} else {  
  //   ctx.throw(401)
  // }
  var id = ctx.params.id;
  ctx.body = 'this is /:id/reservations resposne : ' + id 
})

module.exports = router