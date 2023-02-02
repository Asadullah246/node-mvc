const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const aboutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    aboutDescription: {
      type: String,
      required: true,
    },
    aboutStuff: [
      {
        name: {
          type: String,
          required: true,
        },
        designation: {
          type: String,
          required: true,
        },
        phones: [
          {
            operator: {
              type: String,
              required: true,
            },
            phone: {
              type: String,
              required: true,
            },
          },
        ],
        description: {
          type: String,
          required: true,
        },
        photo: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
module.exports = About;
