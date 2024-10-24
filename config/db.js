const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
  .connect(process.env.MONGO_URI, {
      dbName: "tpwitsDB",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = connectDB;