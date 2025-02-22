const Fund = require("../models/Fund");

const transferFunds = async (req, res) => {
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
    const user_id = req.query.user_id;
    try {
        const funds = await Fund.find({ user: user_id});
        return res.status(200).json({ funds });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { transferFunds, withdrawFunds, getFundsData };
