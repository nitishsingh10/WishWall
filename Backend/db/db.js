const  mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection error:', err);
  }
}


module.exports = main;