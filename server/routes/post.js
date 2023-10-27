const post_controller = require('../controllers/post_controller');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create-post', authMiddleware, post_controller.createPost);
router.post('/upvote/:id', authMiddleware, post_controller.upvotePost);
router.get('/:id', post_controller.getAPost);
router.get('/', post_controller.getAllPosts);
router.delete('/:id', authMiddleware, post_controller.deletePost);


module.exports = router;