const express = require('express');
const Certificate = require('../models/certModel');
const router = express();
const fs = require('fs-extra');

router.get('/verify-cert', async(req, res)=>{
    const token = req.query.token;
    const cert_exists = await Certificate.exists({token : token});
    if(cert_exists){
        console.log(token, cert_exists);
        res.send("VERTIFIED!");
    }
})

module.exports = router;
