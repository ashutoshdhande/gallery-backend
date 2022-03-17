const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    //Grab fields
    const { firstName, lastName, email, password, dob } = req.body;

    //check if fields exists
    if (!(firstName && lastName && email && password && dob)) {
      res
        .status(400)
        .send("<h1>All Fields are required. Check and Try again</h1>");
    }

    //find if email is already registered
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(200).send("<h1>Email is already registered.</h1>");
    }
    //Encrypt password
    const hashPass = await bcrypt.hash(password, 10);

    //Create instance
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      dob,
    });

    //Generate token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    //Set Token password and final response
    user.token = token;
    user.password = undefined;

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
  console.log(`Sign up is running`);
};

exports.signin = (req, res) => {
  console.log(`Sign in is running`);
};
