//results.js

const express = require("express");
const router = express.Router();

//External Modules
import { getVotes } from "../utils/getVotes";

router.get("/results", (req, res) => {
    if (req.body === null) {
        res.status(400).json({ error: "No poll id provided" });
    } else {
        try {
            getVotes(req.query.pollId).then(results => {
                res.send({ status: 200, data: results });
            });
        } catch (err) {
            console.log("/api/poll/results", err);
            res.status(500).json({
                error: "/api/poll/results failure",
                err
            });
        }
    }
});

module.exports = router;
