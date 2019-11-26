//route.authorization.spec.js

// Module Being Tested
import {
    createToken,
    isRequestAuthorized
} from "../routes/utils/routeAuthorization";

// Test Framework

import { describe } from "mocha";
import { expect } from "chai";

describe("Authorization framework works", function() {
    const payload = { name: "Test Token" };
    const secret = "ThisIsASecret";

    it("Should return a token if all fields provided", function(done) {
        const res = {
            json: obj => {
                expect(obj.status === 200).to.be.true;
                expect(obj.token !== "").to.be.true;
            }
        };
        let result = createToken(payload, res, secret, 31556926);
        done();
    });
});
