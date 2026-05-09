const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const verifyUser = require('../middleware/auth');



router.post("/newpost", verifyUser ,async (req,res)=>{

    try{
        const{message} = req.body

        const post = new Post({
            message,
            author : req.user.name,
            time : Date.now()
        });

        await post.save();

        res.json({
            success : true,
            message : "post created Successfully",
            post : {
                author : post.author,
                message : post.message,
                time : post.time
            }
        });

    }
    catch{
        res.json({success:false, message: "post not created"});
    }
});

router.post("/myposts",async (req,res)=>{

    try{

        const{author} = req.body;

        const posts = await Post.find({author});
        res.json({
            success : true,
            posts
        });
    }
    catch{
        res.json({success:false, message: "post not found"});
    }

});

router.get("/feed",async (req,res)=>{

    try{

        const posts = await Post.find();
        res.json({
            success : true,
            posts
        });

    }
    catch{
        res.json({success:false, message: "post not found"});
    }
})

module.exports = router;

