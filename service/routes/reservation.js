const router = require('koa-router')()
const Reservation = require('../controllers/reservation.controller')
const Books = require('../controllers/books.controller')
const passport = require('../passport/passport')

router.prefix('/reservation')


// get all reservations
router.get('/', passport.authenticate('jwt', {session: false}), async function(ctx, next) {
  let reservations = await Reservation.getAllReservations();
  if (reservations) {
    ctx.body = reservations;
  } else {
    ctx.status = 500;
  }
})

// create a reservation
router.post('/', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  let reservationSearchResult = await Reservation.searchOneReservation(ctx.request.body.user_id, ctx.request.body.book_id)
  if (!reservationSearchResult) {
    const reservation = await Reservation.createNewReservation(ctx.request.body.user_id, ctx.request.body.book_id, new Date(), new Date());
    if (reservation) {
      ctx.body = reservation;
    } else {
      ctx.status = 500;
      ctx.body = "internal error"
    }
  } else {
    ctx.status = 409;
    ctx.body = "reserversion exist, can't reserversion same again!"
  }
})

// delete one reservation
router.delete('/', passport.authenticate('jwt', {session: false}), async function (ctx, next) {
  let reservationDeleteResult = await Reservation.DeleteOneReservation(ctx.request.body.user_id, ctx.request.body.book_id)
  if (reservationDeleteResult) {
    let bookItem = await Books.searchBookById(ctx.request.body.book_id)
    if (bookItem) {
      let bookUpdateBody = {
        title: bookItem.title,
        description: bookItem.description,
        count: bookItem.count + 1
      }
      let bookItemUpdateResult = await Books.updateBookById(bookItem.id, bookUpdateBody);
      if (bookItemUpdateResult) {
        ctx.status = 204
      } else {
        ctx.status = 500
      }
    } else {
      ctx.status = 500
    }
  }else {
    ctx.status = 500
  }
})

module.exports = router