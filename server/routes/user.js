const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const user_controller = require("../controllers/user_controller");

// Define specific routes (like authentication or resource-specific routes) first.

router.get('/check-auth',authMiddleware, user_controller.checkAuth);
router.put('/:username',authMiddleware, user_controller.updateUserProfile);
router.post('/sign-in', user_controller.signIn);
router.post('/sign-out', user_controller.signOut);
router.post('/sign-up', user_controller.signUp);
router.get('/:username', user_controller.getUserProfile);

module.exports = router;