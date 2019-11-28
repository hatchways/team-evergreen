//userData.validation.spec.js

// Module Being Tested
import { validateUserDataInput } from "../validation/userData";

// Test Framework
import { describe } from "mocha";
import { expect } from "chai";

describe("User Data submitted is validated", function() {
    it("Should not be valid when the name and e-mail values are empty", function(done) {
        const data = { name: null, email: null };
        const result = validateUserDataInput(data);
        expect(result.isValid).to.be.false;
        done();
    });

    it("Should not accept an e-mail not in the right format", function(done) {
        const data = { name: null, email: "invalid.email" };
        const result = validateUserDataInput(data);
        expect(result.isValid).to.be.false;
        done();
    });

    it("Should be valid if an e-mail in the right format is provided", function(done) {
        const data = { name: null, email: "valid.email@test.com" };
        const result = validateUserDataInput(data);
        expect(result.isValid).to.be.true;
        done();
    });

    it("Should be valid if only name value is provided", function(done) {
        const data = { name: "Test Name", email: null };
        const result = validateUserDataInput(data);
        expect(result.isValid).to.be.true;
        done();
    });
});
