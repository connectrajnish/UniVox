// createPost, readPost(all and single), upvote, delete
const Post = require("../models/post");
const User = require("../models/userProfile");
const Category = require('../models/postCategory');


module.exports.createPost = async (req, res) => {
  try {
    const { heading, richText, category} = req.body;
    const userId = req.user._id;

    // Create an array to store category objects
    const categoryObjects = [];

     // Iterate through the categories and process each one
    for (const categoryName of category) {
      // Convert category name to lowercase
      const categoryLower = categoryName.toLowerCase();

      // Check if the category already exists
      let categoryObject = await Category.findOne({ name: categoryLower });

      // If the category doesn't exist, create a new one
      if (!categoryObject) {
        categoryObject = new Category({ name: categoryLower, posts: [] });
        await categoryObject.save();
      }

      // Add the category object to the array
      categoryObjects.push(categoryObject);
    }

    // Create a new post document
    const post = new Post({
      heading: heading,
      content: richText, // Rename richText to content
      user: userId, // Use the user ID from the request
      category: categoryObjects.map((cat) => cat._id),
    });

    // Save the post to the database
    const savedPost = await post.save();

    // Add the post ID to the category
    for (const catObj of categoryObjects) {
      catObj.posts.push(savedPost._id);
      await catObj.save();
    }

    // Add the post ID to the user's posts array
    const user = await User.findById(userId);
    user.posts.push(savedPost._id);
    await user.save();

    // Respond with the saved post data
    res.status(201).json({ postId: savedPost._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save the post." });
  }
};

// Fetch posts of a specific category
module.exports.getPostsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName.toLowerCase(); // Get the category name from the request parameters

    // Find the category by name
    const category = await Category.findOne({ name: categoryName }).populate('posts');

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Get the posts associated with the category
    const posts = category.posts;

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts by category' });
  }
};

module.exports.upvotePost = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the request parameters
    const userId = req.user._id; // Get the user ID from the authenticated user

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
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
    res
      .status(200)
      .json({ postId: updatedPost._id, upvotes: updatedPost.upvotes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to upvote the post.", error: error });
  }
};

module.exports.getAPost = async (req, res) => {
  try {
    // Get the post ID from the request parameters
    const postId = req.params.id;

    // Find the post by ID
    const post = await Post.findById(postId).populate('category', 'name');

    if (!post) {
      // If the post is not found, return a 404 response
      return res.status(404).json({ error: "Post not found" });
    }

    // Respond with the post data
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the post." });
  }
};

// Controller function to get all posts
module.exports.getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find().populate('category', 'name');

    // Respond with the array of post data
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
};

// Controller function to delete a post
module.exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the request parameters
    const userId = req.user._id; // Get the ID of the user making the request

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user making the request is the creator of the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    // Remove the post ID from the user's posts array
    const user = await User.findById(userId);
    const postIndex = user.posts.indexOf(postId);

    if (postIndex !== -1) {
      user.posts.splice(postIndex, 1);
      await user.save();
    }
    
    // Remove the post from the category
    const category = await Category.findById(post.category);
    const postIndexInCategory = category.posts.indexOf(postId);

    if (postIndexInCategory !== -1) {
      category.posts.splice(postIndexInCategory, 1);
      await category.save();
    }

    // Remove the post from the database
    await post.deleteOne();

    // Respond with a success message
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the post' });
  }
};