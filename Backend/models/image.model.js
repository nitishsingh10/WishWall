const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Post = mongoose.model('image', imageSchema);

module.exports = image;