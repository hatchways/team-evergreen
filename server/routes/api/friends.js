//friends.js

const express = require("express");
const router = express.Router();

// External Modules
import {
    followUser,
    unFollowUser,
    getFriends
} from "../utils/friendManagement";

/**
 * @desc Adds a new friend
 * @param req should be a json object -> {data: {userId: value, friendId: value }}
 */

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
                res.status(500).json({ error: "/api/friends/follow", err });
            });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
