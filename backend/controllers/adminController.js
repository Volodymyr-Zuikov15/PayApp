const { validationResult } = require("express-validator");
const User = require("../models/User");
  
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params; 
  const { firstname, secondname, birth_date, email, phone } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.secondname = secondname || user.secondname;
    user.username = firstname + " " + "secondname";
    user.birth_date = birth_date || user.birth_date;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        firstname: updatedUser.firstname,
        secondname: updatedUser.secondname,
        username: updatedUser.username,
        birth_date: updatedUser.birth_date,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};  

module.exports = { updateUser };
