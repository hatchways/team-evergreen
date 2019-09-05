//Poll.spec.js
//Created by Fil - September 5, 2019

import { describe } from "mocha";

const expect = require("chai").expect;
const Poll = require("../models/Poll");
const id = "53d7be30242b692a1138ac8c";

describe("Poll model", function() {
    it("should be valid if all fields provided", function(done) {
        let poll = new Poll({
            title: "Which one?",
            sendToList: id,
            options: {
                1: { url: "www.google.ca" },
                2: { url: "www.microsoft.com" }
            },
            expiresOn: new Date()
        });
        poll.validate(function(err) {
            expect(err).to.be.null;
            done();
        });
    });

    it("should be invalid if title not provided", function(done) {
        let poll = new Poll({
            sendToList: id,
            options: {
                1: { url: "www.google.ca" },
                2: { url: "www.microsoft.com" }
            },
            expiresOn: new Date()
        });
        poll.validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });

    it("should be invalid if sendToList id not provided", function(done) {
        let poll = new Poll({
            title: "Which one?",
            options: {
                1: { url: "www.google.ca" },
                2: { url: "www.microsoft.com" }
            },
            expiresOn: new Date()
        });
        poll.validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });

    it("should be invalid if options not provided", function(done) {
        let poll = new Poll({
            title: "Which one?",
            sendToList: id,
            expiresOn: new Date()
        });
        poll.validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });

    it("should be invalid if only one option provided", function(done) {
        let poll = new Poll({
            title: "Which one?",
            sendToList: id,
            options: {
                2: { url: "www.microsoft.com" }
            },
            expiresOn: new Date()
        });
        poll.validate(function(err) {
            expect(err).to.exist;
            done();
        });
    });
});
