const router = require("express").Router();

const Yoga = require("../models/yoga.model");

/// GET ALL YOGA
router.get("/", async (req, res) => {

  try {

    const yogas = await Yoga.find();

    res.json(yogas);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;