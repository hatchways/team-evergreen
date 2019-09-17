//requests.js

const express = require("express");
const router = express.Router();

//External Modules

router.get("/requests", (req, res) => {
    if (req.query.pollId === undefined) {
        res.status(400).json({ error: "No poll id provided" });
    } else {
        try {
        } catch (err) {
            console.log("/api/poll/requests", err);
            res.status(500).json({
                error: "/api/poll/requests failure"
            });
        }
    }
});

module.exports = router;
