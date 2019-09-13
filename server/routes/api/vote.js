//vote.js

const express = require("express");
const router = express.Router();

// External Modules
import { registerVote } from "../utils/voteModelUpdates";

/**
 * @desc Registers or updates a users vote depending on whether or not a vote
 * @desc was previously cast.
 */
router.post("/vote", function(req, res) {
    if (req.data === null) {
        res.send({ status: 400, message: "No files to upload." });
    } else {
        registerVote(req.data)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
