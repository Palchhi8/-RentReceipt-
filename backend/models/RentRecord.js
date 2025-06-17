const mongoose = require('mongoose');

const rentRecordSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  receiptUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('RentRecord', rentRecordSchema); 