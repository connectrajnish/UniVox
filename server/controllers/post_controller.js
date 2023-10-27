// createPost, readPost, upvote
const Post = require('../models/post');
module.exports.createPost = async (req, res) => {
    try {
        const { heading, richText} = req.body;
        const userId = req.user._id;

        // Create a new post document
        const post = new Post({
          heading: heading,
          content: richText, // Rename richText to content
          user: userId, // Use the user ID from the request
        });
    
        // Save the post to the database
        const savedPost = await post.save();
    
        // Respond with the saved post data
        res.status(201).json({ postId: savedPost._id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save the post.' });
      }
};