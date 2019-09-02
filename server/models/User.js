//User.js
//Created by Fil Gambatesa - August 25, 2019

require('mongoose-type-url');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String
});

module.exports = mongoose.model('user', userSchema);
