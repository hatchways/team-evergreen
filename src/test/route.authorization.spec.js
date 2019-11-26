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
    const secret = "ThisIsASecret";

    it("Should return a token if all fields provided", function(done) {
        const payload = { name: "Test Token" };
        const res = {
            json: obj => {
                expect(obj.status === 200).to.be.true;
                expect(obj.token !== "").to.be.true;
                done();
            }
        };
        createToken(payload, res, secret);
    });

    it("Should return an error if not all fields are provided", function(done) {
        const payload = "";
        const res = {
            status: 600,
            json: obj => {
                console.log(obj, res.status);
                res.status = obj.status;
                expect(obj.status === 500).to.be.true;
                expect(obj.error === "Unable to generate token.").to.be.true;
                return obj;
            }
        };
        createToken(payload, res, secret);
        console.log(res);
        done();
    });
});
