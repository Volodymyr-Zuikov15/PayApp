const bcrypt = require("bcryptjs");
const User = require("../models/User");
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
      } else {
        console.log("Superadmin user already exists.");
      }
    } catch (error) {
      console.error("Error creating default user:", error);
    }
  };

module.exports.createDefaultUser = createDefaultUser;
