// 定义一个验证用户的策略，需要定义name作为标识
const naiveStrategy = {
    name: 'naive',
    // 策略的主体就是authenticate(req)函数，在成功的时候返回用户身份，失败的时候返回错误
    authenticate: function (req) {
      let uid = req.query.uid
      if (uid) {
        // 策略很简单，就是从参数里获取uid，然后组装成一个user
        let user = {
          id: parseInt(uid),
          name: 'user' + uid
        }
        this.success(user)
      } else {
        // 如果找不到uid参数，认为鉴权失败
        this.fail(401)
      }
    }
  }

module.exports = naiveStrategy;