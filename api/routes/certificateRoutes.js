const pdf = require('pdf-lib');
const express = require('express');
const router = express();
const fs = require('fs-extra');
const { PDFDocument } = require('pdf-lib');
const puppeteer = require('puppeteer');
const email_list = require('../uploads/email_list.json');
const Certificate = require('../models/certModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}`.hbs);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

router.post('/cert', async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adityachandra.dev.testing@gmail.com',
            //put your email id for testing
            pass: "Testing*1",
        }
    });

    for (var i in email_list) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            let token = email_list[i].event + crypto.randomBytes(690 / 42).toString('hex');
            const certi = await Certificate.create({
                name: email_list[i].name,
                event: email_list[i].event,
                email: email_list[i].email,
                token: token
            });
            console.log(certi);
            // content = await compile('certificate' + x, email_list[i]); //compiling certificate template

            await page.setContent('<h1> Revels Certificate </h1>');  //link the template here later
            await page.emulateMediaType('screen');
            await page.pdf({
                path: './certificates/' + token + '.pdf',
                format: 'A4',
                printBackground: true
            })
            console.log("Certificate " + i + " generated!");

            const mailOptions = {
                from: 'adityachandra.dev.testing@gmail.com',
                to: email_list[i].email,
                subject: 'CNP Certificate',
                text: 'CNP-Mailer testing',
                attachments: [
                    {
                        filename: email_list[i].name + '.pdf',
                        contentType: 'application/pdf',
                        path: './certificates/' + token + '.pdf',
                    },]
            };

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log("Email Not Sent!", err);
                    return;
                } else {
                    console.log(data, "EMAIL SENT!")
                }
            });

        } catch (e) {
            console.log(e);
            res.status(300).json("Certificate" + i + "Not Generated");
        }
    }
    res.status(200).json('ALL CERTIFICATES GENERATED');
})

module.exports = router;
