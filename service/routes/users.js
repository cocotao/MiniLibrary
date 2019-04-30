const router = require('koa-router')()
const passport = require('../passport/passport')
const User = require('../controllers/user.controller')

var jwt = require('jsonwebtoken');


router.prefix('/user')

// router.use('/*', (ctx, next) => {
//   if (ctx.isAuthenticated()) {
//     next()
//   } else {
//     ctx.status = 401
//     ctx.body = {
//       msg: 'auth fail'
//     }
//   }
// })

// POST /api/user – create new user with provided name and password, should return JWT token
router.post('/',  async function (ctx, next) {
  const userCreateResult = await User.createNewUser(ctx.request.body.name, ctx.request.body.password);
  if (userCreateResult) ctx.body = userCreateResult;
})

// POST /api/user/login –auth user using name and password, should return JWT token if data is correct
// router.post('/login', function (ctx, next) {
//   ctx.body = 'this is a user login response!'
// })

router.post('/login', ctx => { // 会调用策略
  return passport.authenticate('local', function (err, user, info, status) {
    ctx.body = {
      user,
      err,
      info,
      status
    }
    return ctx.login({
      id: 1,
      username: 'admin',
      password: '123456'
    })
  })(ctx)
})


// GET /api/user/logout – clear current JWT token and logout user (Optional)
// router.get('/logout', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

router.get('/logout', ctx => {
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


// import User from '../../models/User';
// import { isAuthenticated } from '../../auth';

// export default (router) => {
//   router
//     // Get user data from server using token
//     .get('/user/me', isAuthenticated(), async ctx => {
//       const user = await User.findById(ctx.passport.user);
//       if (user) ctx.body = user;
//     });
// };
