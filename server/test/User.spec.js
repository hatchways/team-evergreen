//User.spec.js
//Created by Fil - August 25, 2019

import {describe} from 'mocha';

const expect = require('chai').expect;
const User = require('../models/User');

describe("User model", function() {
  it('should be valid if all fields provided', function(done) {
    let user = new User({
                          firstName: "Fil",
                          lastName: "Gambatesa",
                          eMail: "filgdev@gmail.com"
    });
    user.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('should be invalid if e-mail not provided', function(done) {
    let user = new User({
                          firstName: "Fil",
                          lastName: "Gambatesa"
                        });
    user.validate(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it ('should be valid if only e-mail is provided', function(done) {
    let user = new User({
                          eMail: "filgdev@gmail.com"
                        });
    user.validate(function(err) {
      expect(err).to.be.null;
      done();
    });
  });
});