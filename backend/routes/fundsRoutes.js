const express = require("express");
const {
    transferFunds,
    withdrawFunds,
    getFundsData,
} = require("../controllers/fundsController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/transfer", transferFunds);
router.post("/withdraw", withdrawFunds);
router.get("/getfunds", getFundsData);

module.exports = router;