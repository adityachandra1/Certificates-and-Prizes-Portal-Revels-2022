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
        const jwt_token = createToken(admin._id);
        sessionstorage.setItem("jwt", jwt_token);

        console.log(admin);
        res.status(201).json(jwt_token);
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
        
        var user = await Admin.findOne({ email: req.body.email });
        var password=req.body.password;
        var hash=user.password;
        console.log(password);
        console.log(hash);
        console.log(user);
        var passwordIsValid=false;
        if(password===hash)
        passwordIsValid=true;
        if (!passwordIsValid) {
          return res.status(201).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        else
        {
            const token = createToken(user._id);
      sessionstorage.setItem("jwt", token);
  
      res.status(200).json(token);
          
        }
      
    } catch (error) {
        console.log(error);

    }
});

module.exports = router;