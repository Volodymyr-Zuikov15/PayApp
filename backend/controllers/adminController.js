const { validationResult } = require("express-validator");
const User = require("../models/User");
const Plan = require("../models/Plan");
  
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users List",
      users: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params; 
  const { firstname, secondname, birth_date, phone, email, role, plan, btc_bep20_amount, eth_erc20_amount, mac_amount, total_amount, activeStatus } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.secondname = secondname || user.secondname;
    user.username = firstname + " " + "secondname";
    user.birth_date = birth_date || user.birth_date;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.role = email || user.role;
    user.plan = plan || user.plan;
    user.btc_bep20_amount = btc_bep20_amount || user.btc_bep20_amount;
    user.eth_erc20_amount = eth_erc20_amount || user.eth_erc20_amount;
    user.mac_amount = mac_amount || user.mac_amount;
    user.total_amount = total_amount || user.total_amount;
    user.activeStatus = activeStatus || user.activeStatus;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({
      message: "Plans List",
      plans: plans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { id } = req.params;
  try {
    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({
      message: "Plan found",
      plan: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updatePlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params; 
  const { name, prize, daily_income, monthly_income, yearly_income } = req.body;

  try {
    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    plan.name = name || plan.name;
    plan.prize = prize || plan.prize;
    plan.daily_income = daily_income || plan.daily_income;
    plan.monthly_income = monthly_income || plan.monthly_income;
    plan.yearly_income = yearly_income || plan.yearly_income;

    const updatedPlan = await plan.save();

    res.status(200).json({
      message: "Plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getUsers, getUser, updateUser, getPlans, getPlan, updatePlan };
