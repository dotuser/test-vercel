require('dotenv').config();
const express = require("express");
const cors = require('cors');
const visitorRoutes = require("./routes/visitors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const actionRoutes = require("./routes/actions");
const connectDB = require('./config/db');

const app = express();
const PORT = 3000 | process.env.PORT;

app.use(cors());
app.use(express.json());

//  DB Connection
connectDB();

//  DEFAULT REQ
app.get("/", async (req, res) => res.status(200).send("TPWITS | The Place Where IT Starts"));

//  ROUTES
app.use("/", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/users", userRoutes);
app.use("/api", actionRoutes);

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

module.exports = app;
