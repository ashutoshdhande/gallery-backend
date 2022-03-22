const cloudinary = require("cloudinary").v2;

exports.getUploadPage = (req, res) => {
  res.render("uploadForm");
};

exports.uploadMedia = async (req, res) => {
  const { fileUpload } = req.files;

  if (Array.isArray(fileUpload)) {
    for (let i = 0; i < fileUpload.length; i++) {
      const temp = await cloudinary.uploader.upload(
        fileUpload[i].tempFilePath,
        {
          folder: "gallery",
        }
      );
    }
  } else {
    const temp = await cloudinary.uploader.upload(fileUpload.tempFilePath, {
      folder: "gallery",
    });
  }

  //   console.log(req.files);
  res.send("File Uploaded");
};
