const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema({
  username: String,
  email: String,
  message: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for references
    ref: "User", // The name of the User model
  },
  notResolved: {
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Help", helpSchema);
