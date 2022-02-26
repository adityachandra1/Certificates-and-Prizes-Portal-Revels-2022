const express = require('express');
const jwt = require('jsonwebtoken');
const sessionstorage = require("sessionstorage");

const Admin = require('../models/adminModel');

const router = express();
const JWT_SECRET = "revels2022jwt";


//jwt
const maxAge = 7 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: maxAge });
}

//create-admin
router.post("/create", async (req, res) => {
    const { name, password, email, token, role } = req.body;

    try {
        const admin = await Admin.create({ name, password, email, token, role });
        const jwt_token = createToken(admin._id);
        sessionstorage.setItem("jwt", jwt_token);

        console.log(admin);
        res.status(201).json(jwt_token);
    } catch (err) {
        console.log(err);
        res.status(400, "Error while creating Admin");
    }
});

router.get("/create", async (req, res) => {
    res.send("Create Admin Page!");
})

//list-all-admins
router.get("/listalladmins", async (req, res) => {
    const admins = await Admin.find({});
    console.table(admins);
    res.send(admins);

});

module.exports = router;

