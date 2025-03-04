const { validationResult } = require("express-validator");
const twilio = require('twilio');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// const accountSid = 'your_account_sid';  // Replace with your Twilio Account SID
// const authToken = 'your_auth_token';    // Replace with your Twilio Auth Token
// const client = new twilio(accountSid, authToken);

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, secondname, username, birth_date, phone, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      firstname,
      secondname,
      username,
      birth_date,
      phone,
      email,
      password,
      role: 'user',
    });
    await user.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);
  
  const resData = {
    _id: user._id,
    firstname: user.firstname,
    secondname: user.secondname,
    username: user.username,
    birth_date: user.birth_date,
    phone: user.phone,
    email: user.email,
    role: user.role,
    avatar: user.avatar || null,
    plan: user.plan,
    btc_bep20_amount: user.btc_bep20_amount,
    eth_erc20_amount: user.eth_erc20_amount,
    mac_amount: user.mac_amount,
    total_amount: user.total_amount,
    activeStatus: user.activeStatus,
  };

  res.status(200).json({ message: "Logged in successfully", token, resData });
};

const logout = (req, res) => {
  res.cookie("token", "", { 
    httpOnly: true, 
    expires: new Date(0), 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict" 
  });
  
  res.status(200).json({ message: "Logged out successfully" });
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationCode = async (req, res) => {
  const { mobile } = req.body;
  const code = generateVerificationCode();
  // const sid = await client.messages.create({
  //   body: `Your verification code is ${code}`,
  //   to: mobile,
  //   from: twilioPhoneNumber
  // });
  res.json({ code: "411211" });
};

module.exports = { register, login, logout, sendVerificationCode };
