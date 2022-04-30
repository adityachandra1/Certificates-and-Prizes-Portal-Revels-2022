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

router.post('/cert', async (req, res) => {
    const tokens = [];
    const { email_body } = req.body;
    // var s3 = new AWS.S3();

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_1,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
        "region": process.env.REGION_1,
    });

    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
        SES: new AWS.SES({
            apiVersion: '2010-12-01'
        })
    });

    //LIMIT: 500 per day on gmail
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.MAILER_EMAIL,
    //         //put your email id for testing
    //         pass: process.env.MAILER_PASSWORD,
    //     }
    // });

    for (var i in email_list) {
        try {
            const browser = await puppeteer.launch({
                defaultViewport: { width: 1920, height: 1080 }
            });
            const page = await browser.newPage();
            let token = email_list[i].event + crypto.randomBytes(690 / 42).toString('hex');
            token = token.replace(/\s/g, "");
            tokens.push(token);

            //////CHANGE THIS ACCORDING TO THE NEW S3 link
            let QRLink = 'https://cnpportal.s3.ap-south-1-.amazonaws.com/' + token + ".pdf";
            console.log(QRLink);

            //ADD THIS TO TEMPLATE
            let qr_img = await QRCode.toDataURL(QRLink);

            let template = await fs.readFile('../certificate-template/index1.html', "utf8");


            //else if (email_list[i].type == "FIRST" || email_list[i].type == "SECOND" || email_list[i].type == "THIRD") {
            //template = await fs.readFile('../certificate-template/index3.html', "utf8");
            //template = template.replace(/{{ACCENT_COLOR}}/g, "#FFF389");

            //CHANGE ACCORDING TO THE TEMPLATES

            if (email_list[i].type == "SC") {
                template = await fs.readFile('../certificate-template/index2.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#991D1D");
                template = template.replace("{{CERT_TEXT}}", "in the capacity of a member of the Student Council in Revels'22,the National Cultural and Sports Fest of Manipal Institute of Technology held from 13th to 16th April 2022.");

            } else if (email_list[i].type == "PARTICIPATION") {
                template = await fs.readFile('../certificate-template/index1.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#1B968E");
                template = template.replace("{{CERT_TEXT}}", "");

            } else if (email_list[i].type == "CO_CONVENER") {
                template = await fs.readFile('../certificate-template/index2.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#4A7E16");
                template = template.replace("{{CERT_TEXT}}", "");

            } if (email_list[i].type == "CONVENER") {
                template = await fs.readFile('../certificate-template/index1.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#4A7E16");
                template = template.replace("{{CERT_TEXT}}", "");

            } else if (email_list[i].type == "VOLUNTEER") {
                template = await fs.readFile('../certificate-template/index2.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#14436F");
                template = template.replace("{{CERT_TEXT}}", "in the capacity of a Volunteer in Revels'22,the National Cultural and Sports Fest of Manipal Institute of Technology held from 13th to 16th April 2022.");

            } else if (email_list[i].type == "EVENT_HEAD") {
                template = await fs.readFile('../certificate-template/index2.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#591173");
                template = template.replace("{{CERT_TEXT}}", "in the capacity of a Event Head in Revels'22,the National Cultural and Sports Fest of Manipal Institute of Technology held from 13th to 16th April 2022.");

            } else if (email_list[i].type == "STAR_VOLUNTEER") {
                template = await fs.readFile('../certificate-template/index2.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#740E33");
                template = template.replace("{{CERT_TEXT}}", "in the capacity of a Star Volunteer in Revels'22,the National Cultural and Sports Fest of Manipal Institute of Technology held from 13th to 16th April 2022.");

            } else if (email_list[i].type == "FIRST" || email_list[i].type == "SECOND" || email_list[i].type == "THIRD") {
                template = await fs.readFile('../certificate-template/index3.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#FFF389");
                template = template.replace("{{CERT_TEXT}}", "");

            } else if (email_list[i].type == "CORRESPONDENT_CREW") {
                template = await fs.readFile('../certificate-template/index1.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#FFA86B");
                template = template.replace("{{CERT_TEXT}}", "");

            } else if (email_list[i].type == "CATEGORY_HEAD") {
                template = await fs.readFile('../certificate-template/index1.html', "utf8");
                template = template.replace(/{{ACCENT_COLOR}}/g, "#C4CCFF");
                template = template.replace("{{CERT_TEXT}}", "in the capacity of a member of the Student Council in Revels'22,the National Cultural and Sports Fest of Manipal Institute of Technology held from 13th to 16th April 2022.");
            } else {
                res.status(300).json("Certificate category not found");
            }

            if (email_list[i].type == "FIRST") {
                template = template.replace("{{ winner }}", "FIRST");
            } else if (email_list[i].type == "SECOND") {
                template = template.replace("{{ winner }}", "SECOND");
            } else if (email_list[i].type == "THIRD") {
                template = template.replace("{{ winner }}", "THIRD");
            }
            template = template.replace("{{ first_name }}", email_list[i].name);
            template = template.replace("{{ event_name }}", email_list[i].event);
            template = template.replace("{{ QR }}", qr_img);
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
                text: email_body + "\n\n You can download/verify your certificate by clicking the link below " + QRLink,
                attachments: [{
                    filename: email_list[i].name + '.pdf',
                    contentType: 'application/pdf',
                    path: './certificates/' + token + '.pdf',
                },]
            };

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log("Email Not Sent!", err);
                    res.status(300).json(err.message);
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
            const certi = Certificate.create({
                name: email_list[i].name,
                event: email_list[i].event,
                email: email_list[i].email,
                token: token,
                link: QRLink
            });

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