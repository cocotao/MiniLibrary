
// User Schema defination
const mongoose = require('../db');

var Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User'}, 
  book_id: { type: Schema.Types.ObjectId, ref: 'Books'}, 
  start_date: { type: Date, default: Date.now}, 
  end_date: { type: Date, default: Date.now}, 
});

module.exports = mongoose.model('Reservation', ReservationSchema);