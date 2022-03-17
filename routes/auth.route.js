const express = require("express");
const router = express.Router();
const authControl = require("../controllers/auth.controller");

const { signup, signin } = authControl;

router.post("/signup", signup);

router.post("/signin", signin);

module.exports = router;
