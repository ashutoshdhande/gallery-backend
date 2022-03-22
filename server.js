require("dotenv").config();
require("./config/db")();
require("./config/cloudinary")();
const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const mediaRoute = require("./routes/media.route");
const authMiddleware = require("./middlewares/auth");
const fileUpload = require("express-fileupload");

//Setup view engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Smart Gallery Development Phase");
});

app.get("/sensitive", authMiddleware, (req, res) => {
  const { user } = req.user;
  return res.json({ user });
});

app.use("/", authRoute);
app.use("/media", mediaRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} 😃 😃 😃`);
});
