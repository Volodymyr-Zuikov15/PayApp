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
      enum: ["Transfer", "Withdraw", "Income"],
      default: "Transfer",
    },
    user: { type: String, required: true }
  },
  { timestamps: true } // Add this line to enable timestamps
);

module.exports = mongoose.model("Fund", fundSchema);
