var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.status(200).send("Hello World.");
});

module.exports = router;

//TODO - Replace with permanent root response
