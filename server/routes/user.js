const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const USER = mongoose.model("userProfile");
// const authMiddleware = require("../middleware/authMiddleware");
const user_controller = require("../controllers/user_controller");

router.post('/sign-in', user_controller.signIn);
router.post('/sign-out', user_controller.signOut);
router.post('/sign-up', user_controller.signUp);
router.get('/:username', user_controller.getUserProfile);

module.exports = router;