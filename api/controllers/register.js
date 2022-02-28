var jwt = require("jsonwebtoken");
var User = require("../models/userModel");

exports.register = (req, res) => {

    const user = new User({
        fullName: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        year: req.body.year,
        role: req.body.role
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        } else {
            res.status(200).send({
                message: "user registered"
            })
        }
    });
};