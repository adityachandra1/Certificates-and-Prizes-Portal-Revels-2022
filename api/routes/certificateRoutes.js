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
const AWS = require('aws-sdk');
const QRCode = require('qrcode');
var toSJIS = require('qrcode/helper/to-sjis');

router.post('/cert', async(req, res) => {
    const tokens = [];
    // var s3 = new AWS.S3();

    //LIMIT: 500 per day on gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            //put your email id for testing
            pass: process.env.MAILER_PASSWORD,
        }
    });

    for (var i in email_list) {
        try {
            const browser = await puppeteer.launch({
                defaultViewport: {width: 1920, height: 1080}
            });
            const page = await browser.newPage();
            let token = email_list[i].event + crypto.randomBytes(690 / 42).toString('hex');
            token = token.replace(/\s/g, "");
            tokens.push(token);

            //////CHANGE THIS ACCORDING TO THE NEW S3 link
            let QRLink = 'https://cnpportaltest.s3.ap-south-1.amazonaws.com/' + token + ".pdf";
            console.log(QRLink);

            //ADD THIS TO TEMPLATE
            let qr_img = await QRCode.toDataURL(QRLink);

            let  template = await fs.readFile('../certificate-template/appreciation.html', "utf8");

            //CHANGE ACCORDING TO THE TEMPLATES
            if(email_list[i].type == "PARTICIPANT"){
                template = await fs.readFile('../certificate-template/participation.html', "utf8");
            }else if(email_list[i].type == "WINNER"){
                template = await fs.readFile('../certificate-template/winner.html', "utf8");
            }else if(email_list[i].type == "APPRECIATION"){
                template = await fs.readFile('../certificate-template/index2.html', "utf8");
            }


            template = template.replace("{{ first_name }}", email_list[i].name);
            template = template.replace("{{ event_name }}", email_list[i].event);
            template = template.replace( "{{ QR }}", qr_img );
            await page.setContent(template); //link the template here later
            await page.emulateMediaType('screen');
            await page.pdf({
                path: './certificates/' + token + '.pdf',
                // format: 'A4',
                width: '850px',
                height: '627px',
                printBackground: true
            });
            console.log("Certificate " + i + " generated!");

            const mailOptions = {
                from: process.env.MAILER_EMAIL,
                to: email_list[i].email,
                subject: 'Revels Certificate',
                text: 'Your Revels Certificate is here!, you can download your certificate at ' + QRLink,
                attachments: [{
                    filename: email_list[i].name + '.pdf',
                    contentType: 'application/pdf',
                    path: './certificates/' + token + '.pdf',
                }, ]
            };

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log("Email Not Sent!", err);
                    return;
                } else {
                    // console.log(data, "EMAIL SENT!")
                }
            });
            const fileName = './certificates/' + token + '.pdf';
            const content = fs.readFileSync(fileName);
            // const params = {
            //     Bucket: process.env.AWS_BUCKET_NAME,
            //     Key: `${token}.pdf`,
            //     Body: content
            // };
            // s3.upload(params, (err, data) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(data);
            //     const certi = Certificate.create({
            //         name: email_list[i].name,
            //         event: email_list[i].event,
            //         email: email_list[i].email,
            //         token: token,
            //         link: data.Location,
            //     });
            // });
        } catch (e) {
            console.log(e);
            res.status(300).json("Certificate" + i + "Not Generated");
        }
    }

    console.log(tokens);
    //tokens.forEach(uploadPdfToS3);

    res.status(200).json('ALL CERTIFICATES GENERATED');
})

module.exports = router;