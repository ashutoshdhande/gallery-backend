require("dotenv").config();
require("./config/db")();
const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");

//Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Smart Gallery Development Phase");
});

app.use("/", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} 😃 😃 😃`);
});
