const express = require("express");
const router = express.Router();
const mediaControl = require("../controllers/media.controller");
const authMW = require("./../middlewares/auth");

const { uploadMedia, getUploadPage } = mediaControl;

router.get("/upload", authMW, getUploadPage);

router.post("/upload", uploadMedia);

module.exports = router;
