const express = require("express");
const {
    transferFunds,
    withdrawFunds,
    getFundsData,
} = require("../controllers/fundsController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/transfer", authenticate, transferFunds);
router.post("/withdraw", authenticate, withdrawFunds);
router.get("/getfunds", authenticate, getFundsData);

module.exports = router;