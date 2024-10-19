require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const visitorRoutes = require("./routes/visitors");
// const Visitor = require("./models/Visitor");

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

app.use("/api/visitors", visitorRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
