const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const authRoutes = require('./routes/authRoute');

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});