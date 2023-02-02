const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const billSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    billName: {
      type: String,
      required: true,
    },
    billDescription: {
      type: String,
      required: true,
    },
    billAmount: {
      type: Number,
      required: true,
    },
    billDate: {
      type: Date,
      required: true,
    },
    billPaid: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
