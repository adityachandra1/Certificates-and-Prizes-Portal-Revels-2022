const express = require('express');
const jwt = require('jsonwebtoken');
const sessionstorage = require("sessionstorage");
const Admin = require('../models/adminModel');

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
        const admin = await Admin.create({ name, password, email, token, role });
        console.log(admin);
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
        const user = await Admin.findOne({ email: email, password: password });
        if (user) {
            const accessToken = createToken(user._id);
            res.json({
                accessToken
            });
        } else {
            res.send('Username or password incorrect');
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/hidden', verifyToken, (req, res) => {
    res.send("Hello");
});

module.exports = router;