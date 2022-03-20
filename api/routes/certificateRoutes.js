const pdf = require('pdf-lib');
const express = require('express');
const router = express();
const fs = require('fs-extra');
const { PDFDocument } = require('pdf-lib');
const puppeteer = require('puppeteer');
const email_list = require('../uploads/email_list.json');
const Certificate = require('../models/certModel');
const crypto = require('crypto');

const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}`.hbs);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

router.post('/cert', async (req, res) => {
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
        } catch (e) {
            console.log(e);
            res.status(300).json("Certificate" + i + "Not Generated");
        }
    }
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
