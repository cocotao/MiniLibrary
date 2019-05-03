const LocalStrategy = require('passport-local').Strategy


// defined a verify strategy, 'name' is an idenfication
const localStrategy = new LocalStrategy(
    /**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     */
    function (username, password, done) {
      var test = username;
      return done(null, true, '登录成功')
    }
  )

module.exports = localStrategy;

