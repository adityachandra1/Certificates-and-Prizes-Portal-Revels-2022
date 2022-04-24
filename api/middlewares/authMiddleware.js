const jwt = require("jsonwebtoken");
User = require("../models/adminModel");

const GENERIC_ERROR = 500;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = verifyToken;