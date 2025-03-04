const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Plan = require("../models/Plan");
const createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ role: "superadmin" });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456789@admin", salt);

      const defaultUser = new User({
        firstname: "admin",
        secondname: "Admin",
        username: "admin",
        birth_date: "01/01/1991",
        phone: "1234567890",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "superadmin",
        plan: "none",
      });

      await defaultUser.save();
      console.log("Default superadmin user created.");
    }
  } catch (error) {
    console.error("Error creating default user:", error);
  }
};

const createDefaultPlan = async () => {
  try {
    const existingStarter = await Plan.findOne({ name: "starter" });
    if (!existingStarter) {
      const starterPlan = new Plan({ name: "starter", prize: 1000, daily_income: 14.99, monthly_income: 449.7, yearly_income: 5396.4 });
      await starterPlan.save();
      console.log("StarterPlan created.");
    }

    const existingSilver = await Plan.findOne({ name: "silver" });
    if (!existingSilver) {
      const silverPlan = new Plan({ name: "silver", prize: 2000, daily_income: 37.49, monthly_income: 1124.7, yearly_income: 13496.4 });
      await silverPlan.save();
      console.log("SilverPlan created.");
    }

    const existingGold = await Plan.findOne({ name: "gold" });
    if (!existingGold) {
      const goldPlan = new Plan({ name: "gold", prize: 3000, daily_income: 74.99, monthly_income: 2249.7, yearly_income: 26996.4 });
      await goldPlan.save();
      console.log("GoldPlan created.");
    }

    const existingPlatinium = await Plan.findOne({ name: "platinium" });
    if (!existingPlatinium) {
      const platiniumPlan = new Plan({ name: "platinium", prize: 4000, daily_income: 149.99, monthly_income: 4499.7, yearly_income: 53996.4 });
      await platiniumPlan.save();
      console.log("PlatiniumPlan created.");
    }

  } catch (error) {
    console.error("Error creating default user:", error);
  }
};

module.exports = { createDefaultUser, createDefaultPlan };
