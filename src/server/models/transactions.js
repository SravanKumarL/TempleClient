const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  phoneNumber: Number,
  names: String,
  gothram: String,
  nakshatram: String,
  pooja: String,
  fromDate: Date,
  toDate: Date,
  numberOfDays: Number,
  amount: Number,
  createdBy: String,
});

// Create the model class
const modelClass = mongoose.model('transactions', transactionSchema);

module.exports = modelClass;