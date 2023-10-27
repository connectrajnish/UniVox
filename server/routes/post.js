const post_controller = require('../controllers/post_controller');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create-post', authMiddleware, post_controller.createPost);
router.post('/upvote/:id', authMiddleware, post_controller.upvotePost);
router.get('/:id', post_controller.readPost);


module.exports = router;