const express = require('express');
const user = require('../models/post.model.js');
const database = require('../db/db.js');
const router = express.Router();

router.post('/create', (req, res) => {
  const { username, content } = req.body;
  const newPost = new user({username, content});
  newPost.save()
    .then(() => {
      res.send({ message: 'Post created successfully', post: newPost });
    })
    .catch(err => res.send({ message: 'Error creating post', error: err }));
});
router.get('/get', async (req, res) => {
  try {
    const posts = await user.find();
    res.send({ message: 'Posts retrieved successfully', posts });
  } catch (err) {
    res.send({ message: 'Error retrieving posts', error: err });
  }
});

module.exports = router;