const router = require('koa-router')()
const Reservation = require('../controllers/reservation.controller')
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

module.exports = router