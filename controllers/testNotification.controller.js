const User = require("../models/user.model");
const admin = require("../config/firebase");

exports.sendTestNotification = async (req, res) => {
  try {

    const user = await User.findOne({
      fcmToken: { $exists: true, $ne: null }
    });

    if (!user) {
      return res.status(404).json({
        msg: "No user with FCM token found",
      });
    }

    const response = await admin.messaging().send({

      token: user.fcmToken,

      notification: {
        title: "🧘 Yoga Reminder",
        body: "Start your day with 10 minutes of yoga.",
      },

    });

    console.log("Notification sent:", response);

    res.json({
      success: true,
      response,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Notification failed",
      error: error.message,
    });

  }
};
