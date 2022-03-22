const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

const cloudinaryConnect = () => {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true,
  });
  console.log(`Connected to CLOUDINARY `);
};

module.exports = cloudinaryConnect;
