const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User Profile schema
const userProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    agreedToTerms: {
      type: Boolean,
      required: true
    },
    about: {
      type: String,
    },
    college: {
      type: String,
    },
    yearOfStudy: {
      type: Number,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    profilePhoto: {
      type: String, // Store the file path or URL of the profile photo
    },
    backgroundBanner: {
      type: String, // Store the file path or URL of the background banner
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post", // Reference to the Post model
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
