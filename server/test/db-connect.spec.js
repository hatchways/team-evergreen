//db-connect.spec.js
//Created by Fil - August 25, 2019

import {describe} from 'mocha';
const mongoose = require('mongoose');

const expect = require('chai').expect;
const User = require('../models/User');


describe('Database connection', function() {

  it('Database opens successfully', function(done){
    process.env.NODE_ENV = 'test';
    const config = require("../config/config");
    const _ = require('../config/db-connect');
    const db = mongoose.connection;
    db.on('error', (err) => console.error(err));
    db.once('open', function () {
      //we're connected
      expect(db.name).to.equal(config.db.name);
      done();
    });
  });
});
