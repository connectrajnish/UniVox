const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const USER = mongoose.model("userProfile");
// const authMiddleware = require("../middleware/authMiddleware");
const user_controller = require("../controllers/user_controller");
// to get user profile
// router.get("/user/:id", (req, res) => {
//   USER.findById(req.params.id)
//     .select("-password") // Excludes password field from response
//     .populate("posts") // Populates the user's posts with their IDs and titles
//     .exec((err, user) => {
//       if (err || !user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       res.json({ user });
//     });
// });

router.post('/sign-in', user_controller.signIn);
router.post('/sign-up', user_controller.signUp);
router.get('/profile/:username', user_controller.getUserProfile);
// router.post('/sign-up', (req, res) => {
//   return res.status(200).json({msg: "success"});
// });

module.exports = router;