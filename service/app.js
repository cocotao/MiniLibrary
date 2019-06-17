const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

/**
 * enale session by koa-session
 */
/*
const session = require('koa-session')
app.keys = ['some secret']
const conf = {
  encode: json => JSON.stringify(json),
  decode: str => JSON.parse(str)
}
app.use(session(conf, app))
*/

/**
 * enale passport for user login authenticated
 */
const passport = require('./passport/passport')
const jwtStrategy = require('./passport/strategy/jwt')
const navieStrategy = require('./passport/strategy/naive')
const localStrategy = require('./passport/strategy/local')
const passportJwtStrategy = require('./passport/strategy/passportjwt')


app.use(passport.initialize()) 
// app.use(passport.session())
passport.use(navieStrategy) // call use() to add a verify strategy in passport
// passport.use(jwtStrategy)
passport.use(localStrategy)
passport.use(passportJwtStrategy)

// introduced middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
})) // koa-bodyparser has been introduced by koa-generator, bodyparser must be registered before koa-router
app.use(json())
app.use(logger())

const index = require('./routes/index')
const users = require('./routes/users')
const books = require('./routes/books')
const wechat = require('./routes/wechat')
const reservation = require('./routes/reservation')

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
app.use(wechat.routes(), wechat.allowedMethods())
app.use(reservation.routes(), reservation.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app