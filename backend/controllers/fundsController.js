const { validationResult } = require("express-validator");
const User = require("../models/User");
const Fund = require("../models/Fund");
const Plan = require("../models/Plan");

const transferFunds = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { account, idNumber, amount, user_id } = req.body;

    try {
        const fund = new Fund({
            account: account,
            idNumber: idNumber,
            amount: Number(amount),
            method: "Transfer",
            user: user_id,
        });
        await fund.save();
        return res.status(201).json({ message: "Transferred successfully" });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const withdrawFunds = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { idNumber, amount, user_id } = req.body;

    try {
        const fund = new Fund({
            account: "Main Account",
            idNumber: idNumber,
            amount: Number(amount),
            method: "Withdraw",
            user: user_id,
        });
        await fund.save();
        return res.status(201).json({ message: "Withdraw successfully" });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const getFundsData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const user_id = req.query.user_id;
    try {
        const funds = await Fund.find({ user: user_id});
        return res.status(200).json({ funds });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
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
  
const activateUserPlan = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params; 
    const { plan } = req.body;
    try {
        const user = await User.findById(id);
        const planItem = await Plan.findOne({ name: plan });
        if (!user || !planItem) {
            return res.status(404).json({ message: "User or Plan not found" });
        }
        if (user.total_amount > planItem.prize) {
            user.total_amount = user.total_amount - planItem.prize;
            user.plan = plan;
            const updatedUser = await user.save();

            const fund = new Fund({ // Save the history to the database...
                account: "Main Account",
                idNumber: "123456",
                amount: planItem.prize,
                method: "ActivatePlan",
                user: id,
            });
            await fund.save();
            res.status(200).json({
                message: "User upgraded plan successfully",
                _id: updatedUser._id,
                firstname: updatedUser.firstname,
                secondname: updatedUser.secondname,
                username: updatedUser.username,
                birth_date: updatedUser.birth_date,
                phone: updatedUser.phone,
                email: updatedUser.email,
                role: updatedUser.role,
                avatar: updatedUser.avatar || null,
                plan: updatedUser.plan,
                btc_bep20_amount: updatedUser.btc_bep20_amount,
                eth_erc20_amount: updatedUser.eth_erc20_amount,
                mac_amount: updatedUser.mac_amount,
                total_amount: updatedUser.total_amount,
            });
        } else {
            res.status(400).json({
                message: "Insufficient Balance",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getNotifications = async (req, res) => {
    try {
      const notifications = await Fund.find({ read_status: false });
      res.status(200).json({
        message: "Notification List",
        notifications: notifications,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};

const deleteNotification = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const fund = await Fund.findById(id);
        if (!fund) {
            return res.status(404).json({ message: "Notification not found" });
        }

        fund.read_status = true;
        await fund.save();
        return res.status(201).json({ message: "Delete Notification successfully" });
        
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { transferFunds, withdrawFunds, getFundsData, getPlans, activateUserPlan, getNotifications, deleteNotification };
