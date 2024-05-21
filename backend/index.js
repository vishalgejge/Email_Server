const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const pdfRoute = require('./pdfRoutes');

env.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/api', pdfRoute);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
