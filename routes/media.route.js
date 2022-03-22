const express = require("express");
const router = express.Router();
const mediaControl = require("../controllers/media.controller");
const authMiddleware = require("../middlewares/auth");

const { uploadMedia, getUploadPage } = mediaControl;

router.get("/upload", getUploadPage);

router.post("/upload", uploadMedia);

module.exports = router;
