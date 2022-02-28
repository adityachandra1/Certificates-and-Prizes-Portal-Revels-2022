var express = require("express"),
    router = express.Router(),
    verifyToken = require('../middlewares/authJWT'),
    { login } = require("../controllers/login.js"),
    { register } = require("../controllers/register.js");

router.post("/register", register, function(req, res) {

});

router.post("/login", login, function(req, res) {

});

module.exports = router;