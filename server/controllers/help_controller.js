const express = require("express");
const router = express.Router();
const Help = require("../models/help");

// Create a new help entry
module.exports.createHelpEntry = async (req, res) => {
  try {
    const { username, email, message } = req.body; // Extract userId from the request body
    const userId = req.user._id;
    if (!username || !email || !message || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const helpEntry = new Help({ username, email, message, userId });
    await helpEntry.save();
    return res.status(200).json({ message: "Help entry created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.getAllNotResolvedEntry = async (req, res) => {
  try {
    const notResolvedHelpEntries = await Help.find({ notResolved: true });
    res.status(200).json(notResolvedHelpEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};