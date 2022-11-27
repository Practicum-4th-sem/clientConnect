const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price."],
  },
  role: {
    type: String,
    enum: ["service", "product"],
    default: "product",
    required: [true, "Please provide a category"],
  },
  category: {
    type: String,
  },
  // image: {
  //   type: Array,
  //   default: [],
  //   // minlength: 1,
  // },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: [true, "Please write a detailed description."],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
