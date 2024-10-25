require('dotenv').config();
const express = require("express");
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const visitorRoutes = require("./routes/visitors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const actionRoutes = require("./routes/actions");
const employeeMngRoutes = require("./routes/employeeMng");
const connectDB = require('./config/db');
const corsOpt = require('./config/cors');
const { verifyToken } = require('./config/jwt');

const app = express();
const PORT = 3000 | process.env.PORT;
const IP = '172.25.1.20';

app.use(cors(corsOpt));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//  DB Connection
connectDB();


//  DEFAULT REQ
app.get("/", async (req, res) => res.status(200).send("TPWITS | The Place Where IT Starts"));

//  ROUTES
app.use("/", authRoutes);
// app.use("/api/visitors", visitorRoutes);
app.use("/api", userRoutes);
app.use("/api", actionRoutes);
app.use("/api/employee", verifyToken, employeeMngRoutes);

app.listen(PORT, IP, () => console.log(`Server listening on http://${IP}:${PORT}`));

module.exports = app;
