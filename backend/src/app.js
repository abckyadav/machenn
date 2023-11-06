const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const connectMongoDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, async () => {
  try {
    await connectMongoDB();
    console.log(`listening on port ${PORT}`);
  } catch (error) {
    console.log("error", error);
  }
});
