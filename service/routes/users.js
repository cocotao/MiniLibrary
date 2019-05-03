const router = require('koa-router')()
const User = require('../controllers/user.controller')
const passport = require('../passport/passport')
const secret = 'jwt demo'


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

router.post('/aaa', async (ctx) => {
  if (ctx.isAuthenticated()) {
    // ctx.state.user就是鉴权后得到的用户身份
    ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
  } else {
    ctx.throw(401)
  }
})

router.post('/userValidateSuccess',
  passport.authenticate('jwt', {
    successRedirect: '/user/bbb',
    failureFlash: 'Invalid username or password.'
  })
)

router.post('/bbb', async (ctx) => {
  if (ctx.isAuthenticated()) {
    // ctx.state.user就是鉴权后得到的用户身份
  //  ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
    ctx.body = {
      message: '获取token成功',
      code: 1,
      token: ctx.header.authorization
    }
  } else {
    ctx.throw(401)
  }
})

router.post('/ccc', passport.authenticate('jwt', {}) , async (ctx) => {
  if (ctx.isAuthenticated()) {
    // ctx.state.user就是鉴权后得到的用户身份
  //  ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
    ctx.body = {
      message: '获取token成功',
      code: 1,
      token: ctx.header.authorization
    }
  } else {
    ctx.throw(401)
  }
})

// app.use(router.routes())
router.post('/login', passport.authenticate('naive', {
  // successRedirect: '/user/bbb',
  // failureFlash: 'Invalid username or password.'
}), async (ctx) => {
  const user = ctx.request.body
  if (user && user.username) {
    let userToken = {
      name: user.username
    }
    const token = jwt.sign(userToken, secret, {
      expiresIn: '1h' //token签名 有效期为1小时
    })
    ctx.header.authorization = token;
    ctx.body = {
      message: '获取token成功',
      code: 1,
      token
    }
    // ctx.response.redirect('/user/userValidateSuccess')
  } else {
    ctx.body = {
      message: '参数错误',
      code: -1
    }
  }
})

// router.post('/login', 
//   async (ctx) => {
//     const user = ctx.request.body
//     if (user && user.username) {
//       let userToken = {
//         name: user.username
//       }
//       const token = jwt.sign(userToken, secret, {
//         expiresIn: '1h' //token签名 有效期为1小时
//       })
//       ctx.header.authorization = token;
//       ctx.body = {
//         message: '获取token成功',
//         code: 1,
//         token
//       }
//      ctx.response.redirect('/user/userValidateSuccess')
//     } else {
//       ctx.body = {
//         message: '参数错误',
//         code: -1
//       }
//     }
//   }
// )


// GET /api/user/logout – clear current JWT token and logout user (Optional)
router.post('/logout', function (ctx, next) {
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