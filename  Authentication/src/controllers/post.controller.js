const  express = require("express");
const  Post =  require("../models/post.model");
const authenticate = require("../middlewares/authenticate")
const router = express.Router();
// console.log(authenticate)



router.post("/", authenticate, async (req,res) => {

    try {
        const user = req.user;
        console.log("user",user);
        const post = await Post.create({
            name: req.body.name,
            body:req.body.body,
            title:req.body.title,
            image_urls: ["www.google.com"],
            user_id: user.user._id,
        });

        return res.status(201).send(post);
    } catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });

    }
});

router.get("/",async (req, res) => {
    const posts = await Post.find().lean().exec();
    return res.send(posts);
});

module.exports = router;
