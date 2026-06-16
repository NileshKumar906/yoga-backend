const User = require("../models/user.model");

exports.saveFcmToken = async (req, res) => {

  console.log("===== FCM ROUTE HIT =====");

  try {

    const userId = req.user;

    const { fcmToken } = req.body;

    console.log("USER ID:", userId);
    console.log("FCM TOKEN:", fcmToken);

    await User.findByIdAndUpdate(
      userId,
      { fcmToken }
    );

    console.log("TOKEN SAVED");

    return res.json({
      success: true
    });

  } catch(error){

    console.log(error);

    return res.status(500).json({
      msg: "Server Error"
    });
  }
};