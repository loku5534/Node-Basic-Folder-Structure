const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const PORT = 4001;

require("dotenv").config();

const DATABASE = require("./config/dbConfig");

// app.use(express.json());
app.use(bodyParser.json());

const { authRoutes, usersRoutes } = require("./routes");

app.use("/api/auth/", authRoutes);
app.use("/api/users", usersRoutes);

app.get("*", (req, res) => {
  res.json("Welcome to Qrg-Food Portal!");
});
app.listen(PORT, function () {
  console.log("Server listening on port " + PORT);
});
