const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const RedisStore = require('koa-redis')
const passport = require('./passport/passport')



// const index = require('./routes/index')
const users = require('./routes/users')
const books = require('./routes/books')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))  // koa-bodyparser has been introduced by koa-generator, bodyparser must be registered before koa-router
app.use(json())
app.use(logger())

app.use(session({
  cookie: {
    secure: false,
    maxAge: 86400000
  },
  store: RedisStore({})
}, app))
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
  cookie: {
    secure: false,
    maxAge: 86400000
  },
  store: RedisStore({})
}, app))

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
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {  // POST previous check return 200 directly
    ctx.body = 200; 
  } else {
    await next();
  }
});

// routes // orignal router method
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(books.routes(), books.allowedMethods())


// 统一导入controller，router另一种实现方法
/*
function addMapping(router, mapping) {
  for (var url in mapping) {
      if (url.startsWith('GET ')) {
          var path = url.substring(4);
          router.get(path, mapping[url]);
          console.log(`register URL mapping: GET ${path}`);
      } else if (url.startsWith('POST ')) {
          var path = url.substring(5);
          router.post(path, mapping[url]);
          console.log(`register URL mapping: POST ${path}`);
      } else {
          console.log(`invalid URL: ${url}`);
      }
  }
}

function addControllers(router) {
  var files = fs.readdirSync(__dirname + '/controllers'); // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
  var js_files = files.filter((f) => {
      return f.endsWith('.js');
  });

  for (var f of js_files) {
      console.log(`process controller: ${f}...`);
      let mapping = require(__dirname + '/controllers/' + f);
      addMapping(router, mapping);
  }
}

addControllers(router); // 导入controller
*/

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
