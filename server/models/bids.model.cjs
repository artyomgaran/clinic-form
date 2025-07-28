const mongoose = require("mongoose");

const Bids = mongoose.model(
  "Bids",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Bids;
