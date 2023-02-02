const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const labourSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
      type: Number,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    nid: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
    },
    signature: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Labour = mongoose.model("Labour", labourSchema);

module.exports = Labour;
