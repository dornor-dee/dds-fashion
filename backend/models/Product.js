const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    countInStock: {
      type: Number,
      default: 0,
    },

    // REVIEWS
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: {
          type: String,
        },

        rating: {
          type: Number,
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },
      },
    ],

    numReviews: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);