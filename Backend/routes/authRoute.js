const express = require('express');
const { message } = require('statuses');
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

router.post('/login',async (req, res)=>{

        const {username, password} = req.body;

        if(!username || !password){
                return res.json({
                        success : false,
                        message : "all fields required"
                });
        }

        res.json({
                success : true, message : "Login working"
        })
});

module.exports = router;