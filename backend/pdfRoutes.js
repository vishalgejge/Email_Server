const express = require('express');
const { createPdf, fetchPdf, sendPdf } = require('./pdfController');
const pdfRoute = express.Router();

pdfRoute.post('/createPdf', createPdf); // to generate pdf 
pdfRoute.get('/fetchPdf', fetchPdf); // to fetch the generated pdf
pdfRoute.post('/sendPdf', sendPdf); // send pdf to mail

// Dummy route to test backend connection
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

module.exports = pdfRoute;
