const router = require('koa-router')()   // koa-generator has import koa-router
const crypto = require('crypto')
const config = require('../passport/config')


router.get('/wx', async (ctx, next) => {
  let sWechatToken = config.wechatToken;

  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  let signature = ctx.query.signature,//微信加密签名
    timestamp = ctx.query.timestamp,//时间戳
    nonce = ctx.query.nonce,//随机数
    echostr = ctx.query.echostr;//随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  var array = [sWechatToken, timestamp, nonce];
  array.sort();

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  var tempStr = array.join('');
  const hashCode = crypto.createHash('sha1'); //创建加密类型 
  var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); //对传入的字符串进行加密

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (resultCode === signature) {
      ctx.body = echostr
  } else {
      ctx.body = 'mismatch'
  }
})

router.get('/aaa', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

// post method and use bodyparser to parse request body with json structure 
router.post('/signin', async (ctx, next) => {
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
});

module.exports = router
