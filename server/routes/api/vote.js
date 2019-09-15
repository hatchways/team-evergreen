//vote.js

const express = require("express");
const router = express.Router();

// External Modules
import { registerVote } from "../utils/voteModelUpdates";

/**
 * @desc Registers or updates a users vote depending on whether or not a vote
 * @desc was previously cast.
 * @param req should be a json object -> {data: {pollId: value, userId: value, opinion: value }}
 */

router.post("/vote", function(req, res) {
    if (req.body === null) {
        res.send({ status: 400, message: "No data provided." });
    } else {
        registerVote(req.body.pollId, req.body.userId, req.body.option)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log("error", err);
                res.send(err);
            });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
