require("dotenv").config();
require("./config/db")();
const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Smart Gallery Development Phase");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} 😃 😃 😃`);
});
