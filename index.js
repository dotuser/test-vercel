const express = require("express");
const app = express();
const visitorRoutes = require('./routes/visitors');

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/home", (req, res) => res.send("Home"));

app.use("/api/visitors", visitorRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
