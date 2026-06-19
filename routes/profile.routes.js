const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth.middleware");

const {
  updateName,
} = require("../controllers/profile.controller");

router.put(
  "/update-name",
  auth,
  updateName
);

module.exports = router;
