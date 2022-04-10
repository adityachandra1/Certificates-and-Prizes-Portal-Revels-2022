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

const compile = async function(templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}`.hbs);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

router.post('/cert', async(req, res) => {
    const tokens = [];
    var s3 = new AWS.S3();
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
            token = token.replace(" ", "");
            tokens.push(token);

            // content = await compile('certificate' + x, email_list[i]); //compiling certificate template
            let template = await fs.readFile('../certificate-template/index.html', "utf8");
            template = template.replace("{{ first_name }}", email_list[i].name);
            template = template.replace("{{ event_name }}", email_list[i].event);
            await page.setContent(template); //link the template here later
            await page.emulateMediaType('screen');
            await page.pdf({
                path: './certificates/' + token + '.pdf',
                format: 'A4',
                printBackground: true
            });
            console.log("Certificate " + i + " generated!");

            const mailOptions = {
                from: 'adityachandra.dev.testing@gmail.com',
                to: email_list[i].email,
                subject: 'CNP Certificate',
                text: 'CNP-Mailer testing',
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
                    console.log(data, "EMAIL SENT!")
                }
            });

            const fileName = './certificates/' + token + '.pdf';
            const content = fs.readFileSync(fileName);
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${token}.pdf`,
                Body: content
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
                const certi = Certificate.create({
                    name: email_list[i].name,
                    event: email_list[i].event,
                    email: email_list[i].email,
                    token: token,
                    link: data.Location,
                });
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

//USING PDF-LIB
// const ORGANISER_CERT_X = 50;
// const ORGANISER_CERT_Y = 600;
// router.post("/certificate", async(res, req) => {
//     const existingPDFBytes = fs.readFile('./certificates/sample_cert.pdf', 'Uint8Array' , (err, data)=>{
//         console.log(data);
//     });

//     const pdfDoc = await PDFDocument.load(existingPDFBytes);

//     const pages = pdfDoc.getPages;
//     for (var i in email_list) {
//         const cert = pages[0];
//         const { width, height } = cert.getSize();

//         const fontSize = 45;
//         page.drawText(email_list[i].name, {
//             x: width/2,
//             y: height - 4 * fontSize,
//             size: fontSize,
//             font: timesRomanFont,
//             color: rgb(1, 1, 0),
//         })
//         const pdfBytes = await pdfDoc.save();
//     }
// });

module.exports = router;