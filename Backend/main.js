require("dotenv").config();
const express = require('express');
const app = express();
const connectToDatabase = require('./config/db');
const PORT = process.env.PORT || 5000;
app.use(express.json());
const cors = require('cors');


// It was blocking request form third party urls.. because of cors policy to avoid that we need this
app.use(cors());

connectToDatabase();

const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');


app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});