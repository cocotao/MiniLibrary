const Reservation = require('../db/models/reservation');

// const ReservationSchema = new Schema({
//     book_id: { type: Schema.Types.ObjectId}, 
//     user_id: { type: Schema.Types.ObjectId}, 
//     start_date: { type: Date, default: Date.now}, 
//     end_date: { type: Date, default: Date.now}, 
//   });

module.exports.getAllReservations = function() {
  return Reservation.find({}, null);
};

module.exports.createNewReservation = function(user_id, book_id, start_date, end_date) {
  const reservation = new Reservation({
    user_id: user_id,
    book_id: book_id,
    start_date: start_date,
    end_date: end_date
  });
  return reservation.save();
};


module.exports.updateOneReservation = function(user_id, book_id, start_date, end_date) {
  const updateStr = {
    user_id: user_id,
    book_id: book_id,
    start_date: start_date,
    end_date: end_date
  };
  return Reservation.findOneAndUpdate({ 'user_id':user_id, 'book_id': book_id, }, updateStr);
};

module.exports.searchOneReservation = function(user_id, book_id) {
  return Reservation.findOne({'user_id':user_id, 'book_id': book_id }, 'user_id book_id start_date end_date');
};

module.exports.searchOneReservationByBookId = function(book_id) {
  return Reservation.find({'book_id': book_id }, 'book_id user_id start_date end_date');
};

module.exports.searchOneReservationByUserId = function(user_id) {
  return Reservation.find({'user_id':user_id }, 'book_id user_id start_date end_date').populate('book_id').exec();
};

module.exports.DeleteOneReservation = function(user_id, book_id) {
  return Reservation.remove({'user_id':user_id, 'book_id': book_id });
};
