require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARES
app.use(cors());

app.use(express.json());
app.use("/api/yoga", require("./routes/yoga.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
// ROUTES
app.use(
  "/api/auth",
  require("./routes/auth.routes")
);

app.use(
  "/api/streak",
  require("./routes/streak.routes")
);


// TEST ROUTE
app.get("/", (req, res) => {

  res.send("Yoga Backend Running 🚀");
});


// PORT
const PORT = process.env.PORT || 5000;


// SERVER
app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `Server running on port ${PORT} 🚀`
  );
});