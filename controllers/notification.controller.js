const User = require("../models/user.model");

exports.saveFcmToken = async (req, res) => {

  try {

    const userId = req.user;

    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({
        msg: "FCM token required"
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        fcmToken
      }
    );

    return res.json({
      success: true
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      msg: "Server Error"
    });

  }
};