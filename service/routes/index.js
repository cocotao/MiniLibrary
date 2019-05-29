const router = require('koa-router')()   // koa-generator has import koa-router
const crypto = require('crypto')
const config = require('../passport/config')
var request = require('request');

// 微信测试号
var AppID = 'wx88094ad370bf30a8';
var AppSecret = '3234fab4aa682d5d082e74e3099414ed';

// router.prefix('/')

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
  var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (resultCode === signature) {
    ctx.body = echostr
  } else {
    ctx.body = 'mismatch'
  }
})

router.get('/wxlogin', async (ctx, next) => {
  console.log("oauth - login")

  // 第一步：用户同意授权，获取code
  var router = 'getaccesstoken';
  // 这是编码后的地址
  // var return_uri = 'http%3A%2F%2F148.70.236.60%2Findex%2F' + router;
  // var return_uri = 'http%3A%2F%2F148.70.236.60%2F' + router;
  var return_uri = 'http%3A%2F%2F148.70.236.60%2F' + router;
  var scope = 'snsapi_userinfo';

  ctx.redirect('https://open.weixin.qq.com/connect/oauth2/authorize'
    + '?appid=' + AppID
    + '&redirect_uri=' + return_uri
    + '&response_type=code&scope=' + scope
    + '&state=STATE#wechat_redirect');
})

router.get('/getaccesstoken', async (ctx, next) => {
  console.log("get_wx_access_token")
  console.log("code_return: " + ctx.query.code)

  // 第二步：通过code换取网页授权access_token
  var code = ctx.query.code;
  request.get({
    url: 'https://api.weixin.qq.com/sns/oauth2/access_token'
      + '?appid=' + AppID
      + '&secret=' + AppSecret
      + '&code=' + code
      + '&grant_type=authorization_code',
  },
    function (error, response, body) {
      if (response.statusCode == 200) {

        // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
        //console.log(JSON.parse(body));
        var data = JSON.parse(body);
        var access_token = data.access_token;
        var openid = data.openid;

        request.get({
          url: 'https://api.weixin.qq.com/sns/userinfo'
            + '?access_token=' + access_token
            + '&openid=' + openid
            + '&lang=zh_CN',
        },
          function (error, response, body) {
            if (response.statusCode == 200) {

              // 第四步：根据获取的用户信息进行对应操作
              var userinfo = JSON.parse(body);
              //console.log(JSON.parse(body));
              console.log('获取微信信息成功！');

              // 小测试，实际应用中，可以由此创建一个帐户
              res.send("\
                                <h1>" + userinfo.nickname + " 的个人信息</h1>\
                                <p><img src='" + userinfo.headimgurl + "' /></p>\
                                <p>" + userinfo.city + "，" + userinfo.province + "，" + userinfo.country + "</p>\
                            ");

            } else {
              console.log(response.statusCode);
            }
          }
        );
      } else {
        console.log(response.statusCode);
      }
    }
  );
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
