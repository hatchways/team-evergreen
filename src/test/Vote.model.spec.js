//Vote.model.spec.js

//Testing Framework
import { describe } from "mocha";
import { expect } from "chai";

//Module Under Test
const Vote = require("../models/Vote");
const id = "53d7be30242b692a1138ac8c";

describe("Vote model", function() {
    it("should be valid if all fields provided", function(done) {
        let vote = new Vote({
            userId: id,
            pollId: id,
            option: 1
        });
        vote.validate(function(err) {
            expect(err).to.be.null;
            done();
        });
    });

    it("should be invalid if id not provided", function(done) {
        let vote = new Vote({
            userId: null,
            pollId: id,
            option: 1
        });
        vote.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });

    it("should be invalid if pollId not provided", function(done) {
        let vote = new Vote({
            userId: id,
            pollId: null,
            option: 1
        });
        vote.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });

    it("should be invalid if option not provided", function(done) {
        let vote = new Vote({
            userId: id,
            pollId: id,
            option: null
        });
        vote.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });
});
