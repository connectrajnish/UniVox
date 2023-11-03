const express = require("express");
const router = express.Router();
const helpController = require("../controllers/help_controller");
const authMiddleware = require("../middlewares/authMiddleware");
// Route for creating a new help entry
router.post("/", authMiddleware, helpController.createHelpEntry);
router.get("/not-resolved", helpController.getAllNotResolvedEntry);

module.exports = router;
