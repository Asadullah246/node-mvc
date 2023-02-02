const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const saleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paikarName: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Paikar",
      },
      name: String,
      fatherName: String,
      address: String,
      phone: String,
    },
    saleDate: {
      type: Date,
      required: true,
    },
    saleProducts: [
      {
        name: String,
        quantity: Number,
        price: Number,
        total: Number,
      },
    ],
    saleTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      min: 0,
      trim: true,
    },

    salePaidAmount: {
      type: Number,
      min: 0,
      trim: true,
    },
    salePaid: {
      type: Boolean,
      required: true,
    },
    restMoney: {
        type: Number,
        trim: true,
        min: 0,
    },
    presentStatus: {
        type: String,
        trim: true,
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);
module.exports = Sale;
