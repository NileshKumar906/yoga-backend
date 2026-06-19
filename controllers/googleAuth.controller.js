const User = require("../models/user.model");
const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {

    const { idToken } = req.body;

    const decoded =
      await admin.auth().verifyIdToken(idToken);

    const email = decoded.email;
    const name = decoded.name;

    let user =
      await User.findOne({ email });

    if (!user) {

      user = await User.create({
        name,
        email,
        password: "google-user",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      msg: "Google login failed",
    });
  }
};
