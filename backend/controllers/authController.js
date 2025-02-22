const twilio = require('twilio');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// const accountSid = 'your_account_sid';  // Replace with your Twilio Account SID
// const authToken = 'your_auth_token';    // Replace with your Twilio Auth Token
// const client = new twilio(accountSid, authToken);

const register = async (req, res) => {
  const { email, username, name, surname, mobile,  password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      surname,
      username,
      mobile,
      email,
      password,
      role: 'user',
    });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);
  
  const resData = {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    mobile: user.mobile,
    email: user.email,
    role: user.role
  };

  res.json({ token, resData });
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
const getUserDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Extract the Authorization header
    if (!authHeader) {
      // If no Authorization header is provided
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part after 'Bearer'
    if (!token || token === "null") {
      // If the token is null or not provided
      return res.status(401).json({ message: "Token is invalid or missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById() // Fetch user data
    const user = await User.findById(decoded.id)
      .populate("company")
      .select("-password")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, getUserDetails, sendVerificationCode };
