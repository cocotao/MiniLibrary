const router = require('koa-router')()
const User = require('../controllers/user.controller')
const Reservation = require('../controllers/reservation.controller')
const passport = require('../passport/passport')
const secret = 'jwt demo'
const jwt = require('jsonwebtoken');

router.prefix('/user')

// TODO: delete in manual test
router.get('/', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  let users = await User.getAllUsers()
  if (users) {
    ctx.body = users;
  } else {
    ctx.status = 500;
  }
})

/**
 * POST /user – create new user with provided name and password, should return JWT token
 */
router.post('/', async function (ctx, next) {
  let userSearchResult = await User.searchUserByName(ctx.request.body.name);
  if (!userSearchResult) {
    const user = await User.createNewUser(ctx.request.body.name, ctx.request.body.password);
    if (user) {
      let token = _generateJwtToken(user)
      let responseUserBody = {
        name: user.name,
        _id: user._id
      }
      ctx.body = {
        user: responseUserBody,
        token
      };
    } else {
      ctx.status = 500
      ctx.body = "internal error"
    }
  } else {
    ctx.status = 409
    ctx.body = "user exist!"
  }
})

/**
 * POST /user/login – create new user with provided name and password, should return JWT token
 */
// use naive strategy to do passport authentication for '/user/login', not using session temporarily
router.post('/login', passport.authenticate('naive', {
  session: false
}), async function (ctx, next) {
  let user = ctx.state.user
  let token = _generateJwtToken(user)
    ctx.body = {
      user,
      token
  }
})

/**
 * GET /api/user/logout – clear current JWT token and logout user (Optional)
 */
router.get('/logout', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  // TODO: add jwt token to black list
  let jwtTokenSaveResult = await User.logoutJwtSave(ctx.header.authorization)
  if (jwtTokenSaveResult) {
    ctx.logout()
    ctx.body = {
      user: ctx.state.user
    }
  } else {
    ctx.status = 500
  }
})

/**
 * GET /api/user/:id/reservations (returns reserved books by the user)
 */
// passport.authenticate('jwt', {session: false}),
// Route path: /users/:id/reservations
// Request URL: http://localhost:3000/users/34/reservations
router.get('/:id/reservations', passport.authenticate('jwt', {session: false}), async function(ctx, next) {
  let id = ctx.params.id;
  let searchResult = await Reservation.searchOneReservationByUserId(id);
  if (searchResult) {
    ctx.body = { searchResult }
  } else {
    ctx.status = 404;
    ctx.body = "reservation not found"  
  }
})

/**
 * private functions
 */
_generateJwtToken = function (user) {
  let userToken = {
    name: user.name,
    password: user.password
  }
  // TODO: secret could be enhanced?
  const token = jwt.sign(userToken, secret, {
    expiresIn: '1h'
  })
  return token;
}

module.exports = router


/*
// TODO: passport local strategy test
// passport local strategy not work....
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
*/