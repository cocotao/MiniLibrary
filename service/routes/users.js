const router = require('koa-router')()
const User = require('../controllers/user.controller')
const passport = require('../passport/passport')


var jwt = require('jsonwebtoken');
router.prefix('/user')

// POST /api/user – create new user with provided name and password, should return JWT token
router.post('/',  async function (ctx, next) {
  if (ctx.isAuthenticated()) {
    const userCreateResult = await User.createNewUser(ctx.request.body.username, ctx.request.body.password);
    if (userCreateResult) ctx.body = userCreateResult;
  } else {
    ctx.throw(401)
  }
})

router.get('/aaa', async (ctx) => {
  if (ctx.isAuthenticated()) {
    // ctx.state.user就是鉴权后得到的用户身份
    ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
  } else {
    ctx.throw(401)
  }
})

router.get('/login',
  passport.authenticate('naive', {
    successRedirect: '/aaa'
  })
)

// GET /api/user/logout – clear current JWT token and logout user (Optional)
router.get('/logout', function (ctx, next) {
  ctx.logout()
  ctx.body = {
    auth: ctx.isAuthenticated(),
    user: ctx.state.user
  }
})

// GET /api/user/:id/reservations (returns reserved books by the user)
router.get('/:id/reservations', function(ctx, next) {
  var id = ctx.params.id;
  ctx.body = 'this is /:id/reservations resposne : ' + id 
})

module.exports = router