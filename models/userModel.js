const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
      default:
        "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
    },
    millName: {
      type: String,
      required: true,
    },
    millAddress: {
      type: String,
      required: true,
    },
    millLogo: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "manager",
      enum: ["user", "manager", "owner"],
    },
    otpCode: {
        type: String,
        default: null,
    },
    otpExpire: {
        type: Date,
        default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Create collection and add schema
const User = mongoose.model("User", UserSchema);
// exports
module.exports = User;
