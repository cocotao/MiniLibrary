const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// enale session by koa-session
// const session = require('koa-session')
// app.keys = ['some secret']
// const conf = {
//   encode: json => JSON.stringify(json),
//   decode: str => JSON.parse(str)
// }
// app.use(session(conf, app))

// enale passport for user login authenticated


// 调用use()来为passport新增一个可用的策略
const passport = require('./passport/passport')
const jwtStrategy = require('./passport/strategy/jwt')
const navieStrategy = require('./passport/strategy/naive')
app.use(passport.initialize())
// app.use(passport.session())
passport.use(navieStrategy)
passport.use(jwtStrategy)
// 添加一个koa的中间件，使用naive策略来鉴权。这里暂不使用session
// app.use(passport.authenticate('naive', {
//   session: false
// }))

// 业务代码
const Router = require('koa-router')
const router = new Router()
router.get('/', async (ctx) => {
  if (ctx.isAuthenticated()) {
    // ctx.state.user就是鉴权后得到的用户身份
    ctx.body = 'hello ' + JSON.stringify(ctx.state.user)
  } else {
    ctx.throw(401)
  }
})
// router.post('/login', async (ctx) => {
//   passport.authenticate('naive', {
//     successRedirect: '/'
//   })
// })
app.use(router.routes())
  


// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
})) // koa-bodyparser has been introduced by koa-generator, bodyparser must be registered before koa-router
app.use(json())
app.use(logger())

const index = require('./routes/index')
const users = require('./routes/users')
const books = require('./routes/books')

// error handler
onerror(app)


app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// enable CORS (another method: use koa/cors)
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') { // POST previous check return 200 directly
    ctx.body = 200;
  } else {
    await next();
  }
});

// routes // orignal router method
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(books.routes(), books.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app