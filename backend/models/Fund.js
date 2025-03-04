const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
      enum: ["Main Account", "Savings Account", "Company Account"],
      default: "Main Account",
    },
    idNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    method: {
      type: String,
      required: true,
      enum: ["Transfer", "Withdraw", "Exchange", "ActivatePlan"],
      default: "Transfer",
    },
    user: { type: String, required: true },
    read_status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fund", fundSchema);
