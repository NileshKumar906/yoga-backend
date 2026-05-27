const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.time("register");

    // check existing user
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }

    // faster hashing
    const hashed = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    console.timeEnd("register");

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.time("login");

    // lean() improves speed
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    console.timeEnd("login");

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });
  }
};