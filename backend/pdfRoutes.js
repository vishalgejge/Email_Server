const express = require('express');
const { createPdf, fetchPdf, sendPdf } = require('./pdfController');
const pdfRoute = express.Router();

pdfRoute.post('/createPdf', createPdf);
pdfRoute.get('/fetchPdf', fetchPdf);
pdfRoute.post('/sendPdf', sendPdf);

pdfRoute.get('/dummyJson', (req, res) => {
    res.json({
        message: "Backend is connected!",
        data: {
            name: "John Doe",
            receipt: "12345",
            email: "john@example.com",
            price1: 100,
            price2: 200,
            price3: 300
        }
    });
});

pdfRoute.get('/sendDemoEmail', sendDemoEmail);

module.exports = pdfRoute;
