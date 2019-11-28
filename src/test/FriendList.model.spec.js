//FriendList.model.spec.js

//Testing Framework
import { describe } from "mocha";
import { expect } from "chai";

//Module Under Test
const FriendList = require("../models/FriendList");
const id = "53d7be30242b692a1138ac8c";

describe("FriendList model", function() {
    it("should be valid if all fields provided", function(done) {
        let list = new FriendList({
            userId: id,
            title: "Friend List",
            friends: [id]
        });
        list.validate(function(err) {
            expect(err).to.be.null;
            done();
        });
    });

    it("should be invalid if title not provided", function(done) {
        let list = new FriendList({
            userId: id,
            friends: [id]
        });
        list.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });

    it("should be invalid if userId not provided", function(done) {
        let list = new FriendList({
            userId: null,
            title: "title",
            friends: [id]
        });
        list.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });

    it("should be invalid if only title is provided", function(done) {
        let list = new FriendList({
            title: "title"
        });
        list.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });

    it("should be invalid if only userId is provided", function(done) {
        let list = new FriendList({
            userId: id
        });
        list.validate(function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });
});
