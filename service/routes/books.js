const router = require('koa-router')()
const Books = require('../controllers/books.controller')
const Reservation = require('../controllers/reservation.controller')
const passport = require('../passport/passport')

router.prefix('/books')

// GET /api/books return all Books from db
router.get('/', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  const books = await Books.getAllBooks();
  if (books) ctx.body = books;
})

// PUT /api/books/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  let id = ctx.params.id;
  let putResult = await Books.updateBookById(id, ctx.request.body);
  if (putResult) {
    ctx.body = { putResult }
  } else {
    ctx.status = 500;
    ctx.body = "internal error"  
  }
})

// POST /api/books/:id/reservation (consume start/end date and userId, should raise exception if book already reserved or count not enough)
router.get('/:id/reservations', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  let id = ctx.params.id;
  let searchResult = await Reservation.searchOneReservationByBookId(id);
  if (searchResult) {
    ctx.body = { searchResult }
  } else {
    ctx.status = 404;
    ctx.body = "reservation not found"  
  }
})

// create a new book
router.post('/', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  let bookSearchResult = await Books.searchBookByTitle(ctx.request.body.title)
  if (!bookSearchResult) {
    const books = await Books.createNewBook(ctx.request.body.title, ctx.request.body.description, ctx.request.body.count);
    if (books) ctx.body = books;
  } else {
    ctx.status = 409;
    ctx.body = 'book exist!';
  }
})

module.exports = router