const nodemailer = require('nodemailer');
const express = require('express');
const router = express();

const email_list = require('../uploads/email_list.json');

require('dotenv').config()

router.post('/send-mail', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adityachandra.dev.testing@gmail.com',
            //put your email id for testing
            pass: process.env.PASSWORD,
        }
    });

    let mailing_list = [];
    for(var i in email_list){
        mailing_list.push(email_list[i].email);
    }

    console.log(mailing_list);

    const mailOptions = {
        from: 'adityachandra.dev.testing@gmail.com',
        to: mailing_list,
        subject: 'CNP TESTING',
        text: 'CNP-Mailer testing'
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Email Not Sent!", err);
            return;
        } else {
            console.log(data, "EMAIL SENT!")
            res.json({ status: "success", error: "", data: "" });
        }
    });
})


module.exports = router;