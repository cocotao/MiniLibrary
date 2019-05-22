const User = require('../../controllers/user.controller')
const bcrypt = require('bcrypt');

const naiveStrategy = {
    name: 'naive',
    authenticate: async function (ctx) {
      let userSearchResult = await User.searchUserByName(ctx.body.name);
      if (userSearchResult) {
        let passwordCompareResult = await bcrypt.compare(ctx.body.password, userSearchResult.password) 
        if (passwordCompareResult) {
          this.success({
            name: userSearchResult.name,
            _id: userSearchResult._id
          })
        } else {
          this.fail(404, "username or password error")
        }
      } else {
        this.fail(404, "username or password error")
      }
    }
  }

module.exports = naiveStrategy;