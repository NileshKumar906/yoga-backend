const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth.middleware");

const {
  saveFcmToken
} =
require("../controllers/notification.controller");

const {
  sendTestNotification
} =
require("../controllers/testNotification.controller");

router.post(
  "/fcm-token",
  auth,
  saveFcmToken
);

router.post(
  "/test",
  sendTestNotification
);

module.exports = router;
