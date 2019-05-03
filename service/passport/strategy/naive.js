// defined a verify strategy, 'name' is an idenfication
const naiveStrategy = {
    name: 'naive',
    authenticate: function (req) {
      // TODO: use DB to find user whether exist
      let uid = req.query.uid
      if (uid) {
        let user = {
          id: parseInt(uid),
          name: 'user' + uid
        }
        this.success(user)
      } else {
        this.fail(409)  // user has exist, 409 confilict error
      }
    }
  }

module.exports = naiveStrategy;