// createPost, readPost, upvote
const Post = require('../models/post');
const User = require('../models/userProfile');

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

module.exports.upvotePost = async (req, res) => {
  try {
      const postId = req.params.id; // Get the post ID from the request parameters
      const userId = req.user._id; // Get the user ID from the authenticated user

      // Find the post by ID
      const post = await Post.findById(postId);

      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Check if the user has already upvoted the post
      const userIndex = post.upvotes.indexOf(userId);

      if (userIndex === -1) {
          // User hasn't upvoted the post, so add their ID to the upvotes array
          post.upvotes.push(userId);
      } else {
          // User has already upvoted, so remove their ID from the upvotes array
          post.upvotes.splice(userIndex, 1);
      }

      // Save the updated post
      const updatedPost = await post.save();

      // Respond with the updated post data
      res.status(200).json({ postId: updatedPost._id, upvotes: updatedPost.upvotes.length });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to upvote the post.', error : error });
  }
};