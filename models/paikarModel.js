const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const paikarSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    nationalId: {
      type: String,
      trim: true,
      required: true,
    },
    types: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
      required: true,
    },
    signature: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      default: "approved",
      enum: ["pending", "approved", "rejected"],
      required: true,
    },
    hishab: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hishab",
      },
    ],
    sales: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sale",
      },
    ],
    buys: [
      {
        type: Schema.Types.ObjectId,
        ref: "Buy",
      },
    ],

    nagadDewaNewa: [
      {
        type: Schema.Types.ObjectId,
        ref: "NagadDewaNewa",
      },
    ],
    securityFee: {
      type: Number,
      default: 0,
    },
    nowBalance: {
      type: Number,
      trim: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Paikar = mongoose.model("Paikar", paikarSchema);
module.exports = Paikar;
