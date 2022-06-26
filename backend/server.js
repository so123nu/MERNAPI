const { json } = require('body-parser');
const express = require('express');
const { errorHandler } = require('./middleware/ErrorMiddleware');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals', require('./routes/goalroutes'));
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server running at ${PORT}`) })
