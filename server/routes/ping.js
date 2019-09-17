var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.status(200).send({
        response: `Server is up.`
    });
});

module.exports = router;
