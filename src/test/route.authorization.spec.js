//route.authorization.spec.js

// Module Being Tested
import {
    createToken,
    isRequestAuthorized
} from "../routes/utils/routeAuthorization";

// Test Framework
import { describe } from "mocha";
import { expect } from "chai";

describe("Authorization framework works", async function() {
    it("Should return a token if all fields provided", function(done) {
        const payload = { name: "Test Token" };
        const secret = "ThisIsASecret";
        const res = {
            status: 0,
            token: null,
            error: null,
            json: obj => {
                res.status = obj.status;
                res.token = obj.token;
                res.error = obj.error;
                expect(res.status === 200).to.be.true;
                expect(res.token !== null).to.be.true;
                done();
            }
        };
        createToken(payload, res, secret, 10);
    });

    it("Should fail if payload not an object", function(done) {
        const payload = "Test Token";
        const secret = "ThisIsASecret";
        const res = {
            status: 0,
            token: null,
            error: null,
            json: obj => {
                res.status = obj.status;
                res.token = obj.token;
                res.error = obj.error;
                expect(res.status === 500).to.be.true;
                expect(res.error === "Unable to generate token.").to.be.true;
                done();
            }
        };
        createToken(payload, res, secret, 10);
    });

    it("Should fail if secret has no value", function(done) {
        const payload = "Test Token";
        const secret = "ThisIsASecret";
        const res = {
            status: 0,
            token: null,
            error: null,
            json: obj => {
                res.status = obj.status;
                res.token = obj.token;
                res.error = obj.error;
                expect(res.status === 500).to.be.true;
                expect(res.error === "Unable to generate token.").to.be.true;
                done();
            }
        };
        createToken(payload, res, secret, 10);
    });

    it("Should authorize a valid token", function(done) {
        const payload = { name: "Test Token" };
        const secret = "ThisIsASecret";
        const res = {
            json: obj => {
                res.decode(obj.token);
            },
            decode: token => {
                const result = isRequestAuthorized(token, secret, "/test_path");
                expect(result).to.be.true;
                done();
            }
        };
        createToken(payload, res, secret, 10);
    });

    it("Should not authorize a valid token with the wrong secret", function(done) {
        const payload = { name: "Test Token" };
        const secret = "ThisIsASecret";
        const badSecret = "ThisIsABadSecret";
        const res = {
            json: obj => {
                res.decode(obj.token);
            },
            decode: token => {
                const result = isRequestAuthorized(
                    token,
                    badSecret,
                    "/test_path"
                );
                expect(result).to.be.false;
                done();
            }
        };
        createToken(payload, res, secret, 10);
    });

    it("Should not authorize an invalid token", function(done) {
        const result = isRequestAuthorized("abc", "My Secret", "/test_path");
        expect(result).to.be.false;
        done();
    });

    it("Should skip authorization for specific path", function(done) {
        const result = isRequestAuthorized("abc", "My Secret", "/static");
        expect(result).to.be.true;
        done();
    });
});
