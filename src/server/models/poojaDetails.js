const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  poojaName: { type: String, sparse: true, lowercase: true, },
  amount: Number,
});


// Create the model class
const modelClass = mongoose.model('poojaDetail', userSchema);

//Export the model
module.exports = modelClass;