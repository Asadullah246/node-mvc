const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const hishabSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    purberBaki: {
      type: Number,
      required: true,
    },
    hishabDate: {
      type: Date,
      required: true,
    },
    //mills
    millsHishab: {
      dhans: [
        {
          dhanName: {
            type: String,
            required: true,
          },
          dhanQuantity: {
            type: Number,
            required: true,
          },
          dhanPrice: {
            type: Number,
            required: true,
          },
          dhanTotal: {
            type: Number,
            required: true,
          },
        },
      ],
      bosta: {
        bostaName: {
          type: String,
          trim: true,
        },
        bostaQuantity: {
          type: Number,
          trim: true,
          min: 0,
        },
        bostaPrice: {
          type: Number,
          trim: true,
          min: 0,
        },
        bostaTotal: {
          type: Number,
          trim: true,
          min: 0,
        },
      },

      purifyChal: {
        chalQuantity: {
          type: Number,
          trim: true,
          min: 0,
        },
        chalPrice: {
          type: Number,
          trim: true,
          min: 0,
        },
        chalTotal: {
          type: Number,
          trim: true,
          min: 0,
        },
      },
      tush: {
        tushQuantity: {
          type: Number,
          trim: true,
          min: 0,
        },
        tushPrice: {
          type: Number,
          trim: true,
          min: 0,
        },
        tushTotal: {
          type: Number,
          trim: true,
          min: 0,
        },
      },

      nagadNewa: {
        type: Number,
        trim: true,
        min: 0,
      },
      othersCost: {
        type: Number,
        trim: true,
        min: 0,
      },

      millsTotal: {
        type: Number,
        trim: true,
        min: 0,
      },
    },

    //paikar
    paikarHishab: {
      brans: [
        {
          bransName: {
            type: String,
            trim: true,
          },
          bransQuantity: {
            type: Number,
            trim: true,
            min: 0,
          },
          bransPrice: {
            type: Number,
            trim: true,
            min: 0,
          },
          bransTotal: {
            type: Number,
            trim: true,
            min: 0,
          },
        },
      ],
      chals: {
        chalName: {
          type: String,
          trim: true,
        },
        chalQuantity: {
          type: Number,
          trim: true,
          min: 0,
        },
        chalPrice: {
          type: Number,
          trim: true,
          min: 0,
        },
        chalTotal: {
          type: Number,
          trim: true,
          min: 0,
        },
      },
      kud: {
        kudQuantity: {
          type: Number,
          trim: true,
          min: 0,
        },
        kudPrice: {
          type: Number,
          trim: true,
          min: 0,
        },
        kudTotal: {
          type: Number,
          trim: true,
          min: 0,
        },
      },

      moraChal: {
        chalQuantity: {
          type: Number,
          trim: true,
          min: 0,
        },
        chalPrice: {
          type: Number,
          trim: true,
          min: 0,
        },
        chalTotal: {
          type: Number,
          trim: true,
          min: 0,
        },
      },
      nagadDeposit: {
        type: Number,
        trim: true,
        min: 0,
      },
      othersCost: {
        type: Number,
        trim: true,
        min: 0,
      },
      paikarsTotal: {
        type: Number,
        trim: true,
        min: 0,
      },
    },
    inTotal: {
      type: Number,
      trim: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Create collection and add schema
const Hishab = mongoose.model("Hishab", hishabSchema);

// exports
module.exports = Hishab;
