
// User Schema defination
const mongoose = require('../db');

var Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  book_id: { type: Schema.Types.ObjectId}, 
  user_id: { type: Schema.Types.ObjectId}, 
  start_date: { type: Date, default: Date.now}, 
  end_date: { type: Date, default: Date.now}, 
});

module.exports = mongoose.model('Reservation', ReservationSchema);