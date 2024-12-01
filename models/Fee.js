const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  DateofBirth: { type: String, required: true },
  feesDue: { type: Number, required: true },
  lastPaidDate: { type: String, default: null },
});

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
