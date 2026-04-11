const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  markComplete,
  getStats,
} = require("../controllers/streak.controller");

router.post("/complete", auth, markComplete);
router.get("/", auth, getStats);

module.exports = router;