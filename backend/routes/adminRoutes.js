const express = require("express");
const { getUsers, getUser, updateUser, getPlans, getPlan, updatePlan } = require("../controllers/adminController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const { validateUpdateUser, validateGetUser, validateGetPlan, validateUpdatePlan } = require("../validators/adminValidator");

const router = express.Router();

router.get("/users", [authenticate, authorize(["superadmin"])], getUsers);
router.get("/user/:id", [authenticate, authorize(["superadmin"]), validateGetUser], getUser);
router.put("/updateUser/:id", [authenticate, authorize(["superadmin"]), validateUpdateUser], updateUser);

router.get("/plans", [authenticate, authorize(["superadmin"])], getPlans);
router.get("/plan/:id", [authenticate, authorize(["superadmin"]), validateGetPlan], getPlan);
router.put("/updatePlan/:id", [authenticate, authorize(["superadmin"]), validateUpdatePlan], updatePlan);

module.exports = router;