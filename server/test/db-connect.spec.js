//db-connect.spec.js
//Created by Fil - August 25, 2019

// Setup testing framework
import { describe } from "mocha";
const expect = require("chai").expect;

process.env.NODE_ENV = "test";
// Setup database connection
const mongoose = require("mongoose");
require("../config/config");
require("../config/db-connect");

describe("Database connection", function() {
    it("Opens database successfully", function(done) {
        const db = mongoose.connection;
        // Wait for the connection to open if not open yet
        // Else test will error out if timeout exceeded while waiting
        if (db.readyState === 1) {
            expect(db.readyState).to.equal(1);
            done();
        } else {
            db.once("open", () => {
                expect(db.readyState).to.equal(1);
                done();
            });
        }
    });
});
