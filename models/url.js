const mongoose = require("mongoose");

const urlScheme = mongoose.Schema({
  shortId: {
    type: String,
    require: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    require: true,
  },
  visitHistory: [
    {
      timestamps: {
        type: Number,
      },
    },
    {
      timestamps: true,
    },
  ],
});

const URL = mongoose.model("url", urlScheme);

module.exports = URL;
