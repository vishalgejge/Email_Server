const pdf = require('html-pdf');
const path = require('path');
const pdfTemplate = require('./documents/document');

exports.createPdf = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            console.error('Error generating PDF:', err);
            return res.status(500).send('Error generating PDF');
        }
        res.send('PDF generated');
    });
};

exports.fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, 'invoice.pdf'));
};

exports.sendPdf = (req, res) => {
    const nodemailer = require('nodemailer');
    const fs = require('fs');

    const pathToAttachment = path.join(__dirname, 'invoice.pdf');
    const attachment = fs.readFileSync(pathToAttachment).toString("base64");

    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });

    smtpTransport.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'PDF Generated Document',
        html: 'Testing PDF Generated Document, Thanks.',
        attachments: [
            {
                content: attachment,
                filename: 'invoice.pdf',
                contentType: 'application/pdf',
                path: pathToAttachment
            }
        ]
    }, function (error, info) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        } else {
            res.send('Mail has been sent to your email. Check your mail');
        }
    });
};
