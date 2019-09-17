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
        res.status(400).json({ message: "No data provided." });
    } else {
        registerVote(req.body.pollId, req.body.userId, req.body.option)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log("/api/poll/vote", err);
                res.status(500).json({ error: "/api/poll/vote failure", err });
            });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
