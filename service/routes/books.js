const router = require('koa-router')()
//import books from '../controllers/books'

router.prefix('/books')

// GET /api/books return all Books from db
router.get('/', function (ctx, next) {
  ctx.body = 'this is a books response'
 // books.all
})

// POST /api/books/:id/reservation (consume start/end date and userId, should raise exception if book already reserved or count not enough)
router.post('/:id/reservation', function (ctx, next) {
  ctx.body = 'this is a /:id/reservation response!'
  // books.reservation
})

module.exports = router