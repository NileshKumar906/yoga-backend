const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth.middleware");

const {
  saveFcmToken
} =
require("../controllers/notification.controller");

router.post(
  "/fcm-token",
  auth,
  saveFcmToken
);

module.exports = router;