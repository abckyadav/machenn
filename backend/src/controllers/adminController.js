const User = require("./../models/userModel");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something Went Wrong! while getting users " });
  }
};

exports.getUsersById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Something Went Wrong! while getting single user " });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { number, name, email } = req.body;

    await User.findByIdAndUpdate(userId, { number, name, email });
    return res.status(200).json({ msg: "User updated" });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Something Went Wrong! while updating User data" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);
    return res.status(200).json({ msg: "Successfully Deleted" });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Something Went Wrong! while deleting users" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    return res.status(401).json({
      msg: "Something Went Wrong! while resetting password",
    });
  }
};
