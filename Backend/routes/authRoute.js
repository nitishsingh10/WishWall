const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/signup', async (req, res) => {
        
        try{
                const { name, email, password } = req.body;
                if(!name || !email || !password){
                    return res.json({
                            success : false,
                            message : "All fields are required"
                        });
                }
        
                const user = new User({
                    name,
                    email,
                    password
                });
        
                await user.save()
        
                res.json({success : true, message : "signup working"});
        }
        catch(error){
                res.json({ success: false, message: "Error saving user" });
        }

});

router.post('/login',async (req, res)=>{

        const {name, password} = req.body;

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