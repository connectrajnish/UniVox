const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    heading: {
      type: String,
      required: true
    },
    coverPhoto: {
      type: String // Store the file path or URL of the cover photo
    },
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile' // Reference to the User Profile model who posted the post
    },
    upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'UserProfile' // Reference to User Profile model for users who upvoted
    }],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  });
  
  const Post = mongoose.model('Post', postSchema);
  
  module.exports = Post;