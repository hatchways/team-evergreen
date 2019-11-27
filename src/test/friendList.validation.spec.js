//friendList.validation.spec.js

// Module Being Tested
import { validateFriendListInput } from "../validation/friendList";

// Test Framework
import { describe } from "mocha";
import { expect } from "chai";

describe("Friend list data is validated", function() {
    it("Should return an error when list title is empty", function(done) {
        const data = {};
        const result = validateFriendListInput(data);
        expect(result.isValid).to.be.false;
        done();
    });

    it("Should return an error when friends array is empty", function(done) {
        const data = { title: "Test Friend List", friends: [] };
        const result = validateFriendListInput(data);
        expect(result.isValid).to.be.false;
        done();
    });

    it("Should be valid when all data is provided", function(done) {
        const data = { title: "Test Friend List", friends: ["Friend"] };
        const result = validateFriendListInput(data);
        expect(result.isValid).to.be.true;
        done();
    });
});
