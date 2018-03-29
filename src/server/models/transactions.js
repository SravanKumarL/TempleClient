const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id:Number,
  phoneNumber: Number,
  names: String,
  gothram: String,
  nakshatram: String,
  pooja: String,
  fromDate: Date,
  toDate: Date,
  numberOfDays: Number,
  createdBy: String,
  amount:Number,
  bankName:String,
  chequeNo:Number,
  createdDate:Date
});

// Create the model class
const modelClass = mongoose.model('transactions', transactionSchema);

module.exports = modelClass;
