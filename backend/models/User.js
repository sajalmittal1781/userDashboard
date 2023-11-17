const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password:String,
  phone: String,
  // id: String,
  // creationDate: Date,
  creationDate: { type: String, default: () => new Date().toLocaleDateString('en-GB') },

    // creationDate:Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
