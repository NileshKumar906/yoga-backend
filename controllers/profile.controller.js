const User = require("../models/user.model");

exports.updateName = async (req, res) => {

  try {

    const { name } = req.body;

    const user = await User.findByIdAndUpdate(

      req.user,

      { name },

      { new: true }

    );

    res.json({

      success: true,

      user: {
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });
  }
};
