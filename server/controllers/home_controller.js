const Post = require("../models/post");
module.exports.home = async (req, res) => {
    try {
        let all_posts = await Post.find({});
        // return res.send(all_posts);
        res.send("All posts page");
    } catch (error) {
        console.log(error);
        return;
    }
};