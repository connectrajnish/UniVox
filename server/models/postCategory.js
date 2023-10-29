const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post', // Reference to the Post model
  }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
