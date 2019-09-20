//friends.js

const express = require("express");
const router = express.Router();

// External Modules
import {
    followUser,
    unFollowUser,
    getSampleOfUsers
} from "../utils/friendManagement";

// Follows friend
router.post("/follow", function(req, res) {
    if (req.body.userId === undefined) {
        res.status(400).json({ error: "No data provided." });
    } else {
        followUser(req.body.userId, req.body.friendId)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log("/api/friends/follow", err);
                res.status(500).json({ error: "Unable to follow friend", err });
            });
    }
});

// Unfollows friend
router.post("/unfollow", function(req, res) {
    if (req.body.userId === undefined) {
        res.status(400).json({ error: "No data provided." });
    } else {
        unFollowUser(req.body.userId, req.body.friendId)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log("/api/friends/follow", err);
                res.status(500).json({
                    error: "Unable to unfollow friend.",
                    err
                });
            });
    }
});

/**
 * @params - mandatory: userId
 * @params - optional: sampleSize
 * @returns - array of {_id:, name:, avatar: }
 * */
router.get("/sample", function(req, res) {
    if (req.query.userId === undefined) {
        res.status(400).json({ error: "No data provided." });
    } else {
        getSampleOfUsers(req.query.userId, Number(req.query.sampleSize))
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log("/api/friends/sample", err);
                res.status(500).json({ error: "Unable to get sample.", err });
            });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
