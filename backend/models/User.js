const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    secondname: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String,default: null },
    role: {
      type: String,
      required: true,
      enum: ["superadmin", "user"],
      default: "user",
    },
    plan: {
      type: String,
      required: true,
      enum: ["none", "starter", "silver", "gold", "platinium"],
      default: "none",
    },
    btc_bep20_amount: { type: Number, required: true, default: 0 },
    eth_erc20_amount: { type: Number, required: true, default: 0 },
    mac_amount: { type: Number, required: true, default: 0 },
    total_amount: { type: Number, required: true, default: 0 },
    activeStatus: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
