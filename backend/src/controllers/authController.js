const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, userType } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists! Please Login" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are mandatory" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType: userType || "user",
    });
    await newUser.save();
    return res.status(200).json({ msg: "Registration Successful" });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Registration failed! Try again Later" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      const token = jwt.sign(
        { email: user.email, userId: user._id, role: user.role },
        process.env.SECRET_KEY
      );
      return res.status(200).json({ msg: "successful", token, user });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Login failed! Please Try again Later" });
  }
};
