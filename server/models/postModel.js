const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;
