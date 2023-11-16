const post_controller = require('../controllers/post_controller');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', post_controller.searchPost);

// Create Post Route
router.post('/create-post', authMiddleware, post_controller.createPost);

// Upvote Post Route
router.post('/upvote/:id', authMiddleware, post_controller.upvotePost);

// Get a Single Post Route
router.get('/:id', post_controller.getAPost);

// Get All Posts Route
router.get('/', post_controller.getAllPosts);

// Delete Post Route
router.delete('/:id', authMiddleware, post_controller.deletePost);

// Get Posts by Category Route
router.get('/categories/:categoryName', post_controller.getPostsByCategory);

module.exports = router;