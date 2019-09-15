//results.js

const express = require("express");
const router = express.Router();

//External Modules
import { getVotes } from "../utils/getVotes";

router.get("/results", (req, res) => {
    if (req.body === null) {
        res.send({ status: 400, error: "No poll id provided" });
    } else {
        try {
            getVotes(req.body.pollId)
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    console.log("Call to getVotes returned error:", err);
                    res.send(err);
                });
        } catch (err) {
            console.log("/api/poll/results", err);
            res.send({
                status: 500,
                error: "/api/poll/results failure",
                err
            });
        }
    }
});

module.exports = router;
