//User.js
//Created by Fil Gambatesa - August 25, 2019

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
                                   firstName: String,
                                   lastName:String,
                                   eMail: {
                                     type: String,
                                     required: true,
                                     unique: true
                                   }
                                 });

module.exports = mongoose.model('user', userSchema);
