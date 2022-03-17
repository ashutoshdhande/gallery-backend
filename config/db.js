const mongoose = require("mongoose");
const { DB_URI } = process.env;

// const options = {
//      useNewURL
// }

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected 📚 📚 📚");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
