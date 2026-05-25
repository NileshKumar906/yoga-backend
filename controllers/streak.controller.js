const User = require("../models/user.model");

exports.markComplete = async (req, res) => {

    const user = await User.findById(req.user);

    const today =
    new Date().toISOString().split("T")[0];

    if (user.completedDates.includes(today)) {

        return res.json({
            msg: "Already marked"
        });
    }

    const yesterday = new Date();

    yesterday.setDate(
        yesterday.getDate() - 1
    );

    const y =
    yesterday.toISOString().split("T")[0];

    if (user.completedDates.includes(y)) {

        user.streak++;

    } else {

        user.streak = 1;
    }

    user.completedDates.push(today);

    if (
        user.streak >
        user.longestStreak
    ) {

        user.longestStreak =
        user.streak;
    }

    await user.save();

    res.json({

        streak: user.streak,

        longestStreak:
        user.longestStreak,

        completedDates:
        user.completedDates,
    });
};

exports.getStats = async (req, res) => {

    const user =
    await User.findById(req.user);

    res.json({

        streak: user.streak,

        longestStreak:
        user.longestStreak,

        completedDates:
        user.completedDates,
    });
};