require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

require("./cron/morningReminder");

connectDB();

app.use(cors());

// MUST COME FIRST
app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/googleAuth.routes")
);

app.use(
  "/api/auth",
  require("./routes/auth.routes")
);
app.use(
  "/api/profile",
  require("./routes/profile.routes")
);

app.use(
  "/api/yoga",
  require("./routes/yoga.routes")
);

app.use(
  "/api/upload",
  require("./routes/upload.routes")
);

app.use(
  "/api/notification",
  require("./routes/notification.routes")
);

app.use(
  "/api/streak",
  require("./routes/streak.routes")
);

app.get("/", (req, res) => {
  res.send("Yoga Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT} 🚀`
  );
});
