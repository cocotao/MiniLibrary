const User = require('../../controllers/user.controller')

// defined a verify strategy, 'name' is an idenfication
const naiveStrategy = {
    name: 'naive',
    authenticate: async function (ctx) {
      // TODO: use DB to find user whether exist
      // let uid = ctx.query.uid
      // if (uid) {
      //   let user = {
      //     id: parseInt(uid),
      //     name: 'user' + uid
      //   }
      //   this.success(user)
      // } else {
      //   this.fail(409)  // user has exist, 409 confilict error
      // }
      let user = ctx.body
      let userSearchResult = await User.searchUserByNameAndPassword(ctx.body.name, ctx.body.password);
      if (userSearchResult) {
        this.success(userSearchResult)
      } else {
        this.fail(400, "username or password error")
      }
    }
  }

module.exports = naiveStrategy;