const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.json({
                    success : false,
                    message : "All fields are required"
                });
        }
        res.json({success : true, message : "signup working"});

});

module.exports = router;