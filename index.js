require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const visitorRoutes = require('./routes/visitors');
const Visitor = require("./models/Visitor");

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "tpwitsDB",
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", async (req, res) => {
    try {
        const visitors = await Visitor.find().select('-__v');
        res.send(visitors);
    } catch (error) {
        res.send({ message: error.message });
    }
});
app.get("/home", (req, res) => res.send("Home"));

// app.use("/api/visitors", visitorRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
