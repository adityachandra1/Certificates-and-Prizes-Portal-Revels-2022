const express = require('express');
const jwt = require('jsonwebtoken');
const sessionstorage = require("sessionstorage");
const Admin = require('../models/adminModel');
var bcrypt = require("bcrypt");

const verifyToken = require('../middlewares/authMiddleware.js');
const router = express();

//jwt
const maxAge = 7 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
}

//create-admin
router.post("/create", async(req, res) => {
    const { name, password, email, token, role } = req.body;
    try {
        const admin = await Admin.create({ name, password: bcrypt.hashSync(password, 8), email, token, role });
        res.send("successfully registered");
    } catch (err) {
        console.log(err);
        res.status(400, "Error while creating Admin");
    }
});

router.get("/create", async(req, res) => {
    res.send("Create Admin Page!");
})

//list-all-admins
router.get("/listalladmins", async(req, res) => {
    const admins = await Admin.find({});
    console.table(admins);
    res.send(admins);
});

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email: email });
        if (password) {
            const accessToken = createToken(user._id);
            console.log(email + " logged in");
            res.json({
                accessToken: accessToken,
                name: user.name,
            });
            sessionstorage.setItem("jwt", accessToken);
        } else {
            return res.status(401).send({
                accessToken: null,
                message: "invalid email or password"
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/hidden', verifyToken, (req, res) => {
    res.send("Hello");
});

module.exports = router;