const express = require("express");
const {
    transferFunds,
    withdrawFunds,
    getFundsData,
} = require("../controllers/fundsController");
const {
    validateTransferFunds,
    validateWithdrawFunds,
    validateGetFundsData,
} = require("../validators/fundValidator");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/transfer", [authenticate, validateTransferFunds], transferFunds);
router.post("/withdraw", [authenticate, validateWithdrawFunds], withdrawFunds);
router.get("/getfunds", [authenticate, validateGetFundsData], getFundsData);

module.exports = router;