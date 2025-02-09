const express = require('express');
require('dotenv').config();
const pool = require('./db'); 
const identifyRoute = require('./routes/identify'); 

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("🚀 API is working!");
});

app.use('/api', identifyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
