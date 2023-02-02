const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const securityModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paikar: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Paikar",
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    securityFee: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    securityType: {
        type: String,
        default: "Security Withdraw",
        enum: ["Security Withdraw", "Security Deposit"],
    },
  },
  { timestamps: true }
);

const Security = mongoose.model("Security", securityModel);

module.exports = Security;
