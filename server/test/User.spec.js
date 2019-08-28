//User.spec.js
//Created by Fil - August 25, 2019

import {describe} from 'mocha';

const expect = require('chai').expect;
const User = require('../models/User');

describe("User model", function() {
  it('should be valid if all fields provided', function(done) {
    let user = new User({
                          name: "Bob User",
                          email: "bob@bob.com",
                          password: "123456"
    });
    user.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('should be invalid if e-mail not provided', function(done) {
    let user = new User({
                          name: "Bob User",
                          password: "123456"
                        });
    user.validate(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should be invalid if passord not provided', function(done) {
    let user = new User({
                          name: "Bob User",
                          email: "123456"
                        });
    user.validate(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it ('should be valid if only e-mail and password is provided', function(done) {
    let user = new User({
                          email: "bob@bob.com",
                          password: "123456"
                        });
    user.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});