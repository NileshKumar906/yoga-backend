const User = require("../models/user.model");

exports.markComplete = async (req, res) => {
  try {

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    user.completedDates = user.completedDates || [];
    user.streak = user.streak || 0;
    user.longestStreak = user.longestStreak || 0;

    const today =
      new Date().toISOString().split("T")[0];

    if (user.completedDates.includes(today)) {
      return res.json({
        msg: "Already marked",
      });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const y =
      yesterday.toISOString().split("T")[0];

    if (user.completedDates.includes(y)) {
      user.streak++;
    } else {
      user.streak = 1;
    }

    user.completedDates.push(today);

    if (user.streak > user.longestStreak) {
      user.longestStreak = user.streak;
    }

    await user.save();

    res.json({
      streak: user.streak,
      longestStreak: user.longestStreak,
      completedDates: user.completedDates,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.getStats = async (req, res) => {
  try {

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json({
      streak: user.streak || 0,
      longestStreak: user.longestStreak || 0,
      completedDates: user.completedDates || [],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });
  }
};
