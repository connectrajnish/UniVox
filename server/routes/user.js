const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const requireLogin = require("../middlewares/requireLogin");

// to get user profile
router.get("/user/:id", (req, res) => {
  USER.findById(req.params.id)
    .select("-password") // Excludes password field from response
    .populate("posts") // Populates the user's posts with their IDs and titles
    .exec((err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    });
});

module.exports = router;