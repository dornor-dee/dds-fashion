const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    isDelivered: {
  type: Boolean,
  default: false,
},

deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);