const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["none", "starter", "silver", "gold", "platinium"],
      default: "none",
    },
    prize: { type: Number, required: true },
    daily_income: { type: Number, required: true },
    monthly_income: { type: Number, required: true },
    yearly_income: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
