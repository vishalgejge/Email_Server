const express = require('express');
const app = express();
const env = require('dotenv');
const cors = require('cors');
const pdfRoute = require('./pdfRoutes');

env.config();

// const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: ["https://email-server-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use('/api/pdf', pdfRoute);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
