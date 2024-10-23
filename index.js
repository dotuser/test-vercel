require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const visitorRoutes = require("./routes/visitors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const actionRoutes = require("./routes/actions");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
      dbName: "tpwitsDB",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", async (req, res) => res.status(200).send("TPWITS | The Place Where IT Starts"));

//  ROUTES
app.use("/", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/users", userRoutes);
app.use("/api", actionRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
