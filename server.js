require("dotenv").config();
require("./config/db")();
require("./config/cloudinary")();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const mediaRoute = require("./routes/media.route");
const fileUpload = require("express-fileupload");
const authMW = require("./middlewares/auth");

//Setup view engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", authMW, (req, res) => {
  res.send("Welcome to Smart Gallery Development Phase");
});

app.use("/", authRoute);
app.use("/media", mediaRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT} 😃 😃 😃`);
});
