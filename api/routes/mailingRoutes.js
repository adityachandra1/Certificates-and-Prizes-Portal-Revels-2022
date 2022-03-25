const nodemailer = require('nodemailer');
const express = require('express');
const router = express();

const email_list = require('../uploads/email_list.json');

require('dotenv').config()

router.post('/send-mail', (req, res) => {
    let mailing_list = [];
    for(var i in email_list){
        mailing_list.push(email_list[i].email);
    }
    console.log(mailing_list);
})


module.exports = router;