const express = require("express");
const mongoose = require("mongoose");
const visitorRoutes = require('./routes/visitors');
require('dotenv').config();

const app = express();

mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "tpwitsDB",
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/home", (req, res) => res.send("Home"));

app.use("/api/visitors", visitorRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
