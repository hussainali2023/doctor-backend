const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: String, required: true },
  date: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
});

const Bookings = mongoose.model('Bookings', BookingSchema);

module.exports = Bookings;
