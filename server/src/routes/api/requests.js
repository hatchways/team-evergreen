//requests.js

const express = require("express");
const router = express.Router();

//External Modules

import { getRequests } from "../utils/getFriendsPollRequests";

router.get("/requests", (req, res) => {
    if (req.query.userId === undefined) {
        res.status(400).json({ error: "No user id provided" });
    } else {
        try {
            getRequests(req.query.userId).then(result => {
                res.status(200).json(result);
            });
        } catch (err) {
            console.log("/api/poll/requests", err);
            res.status(500).json({
                error: "/api/poll/requests failure"
            });
        }
    }
});

module.exports = router;
