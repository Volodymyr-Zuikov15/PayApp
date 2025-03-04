const express = require("express");
const {
    transferFunds,
    withdrawFunds,
    getFundsData,
    getPlans,
    activateUserPlan,
    getNotifications,
    deleteNotification,
} = require("../controllers/fundsController");
const {
    validateTransferFunds,
    validateWithdrawFunds,
    validateGetFundsData,
    validateActivateUserPlan,
    validateDeleteNotification
} = require("../validators/fundValidator");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/getfunds", [authenticate, validateGetFundsData], getFundsData);
router.post("/transfer", [authenticate, validateTransferFunds], transferFunds);
router.post("/withdraw", [authenticate, validateWithdrawFunds], withdrawFunds);
router.get("/plan", [authenticate], getPlans);
router.put("/plan/:id", [authenticate, validateActivateUserPlan], activateUserPlan);
router.get("/notification", [authenticate], getNotifications);
router.put("/notification/:id", [authenticate, validateDeleteNotification], deleteNotification);

module.exports = router;
