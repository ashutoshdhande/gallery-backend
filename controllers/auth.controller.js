const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    //Grab fields
    const { firstName, lastName, email, password, dob } = req.body;

    //check if fields exists
    if (!(firstName && lastName && email && password && dob)) {
      return res
        .status(400)
        .send("<h1>All Fields are required. Check and Try again</h1>");
    }

    //find if email is already registered
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(200).send("<h1>Email is already registered.</h1>");
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

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong.");
  }
};

exports.signin = async (req, res) => {
  try {
    //Grab fields & check if it exists
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .send("<h1>All Fields are required. Check and Try again</h1>");
    }

    //find the user in DB
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("Invalid Credentials");

    //Check if password matches
    const validPassword = await bcrypt.compare(password, user.password);

    if (!(email && validPassword)) {
      return res.status(400).send("Invalid Credentials");
    }

    //Generate token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    user.token = token;
    user.password = undefined;
    // return res.status(200).json(user);

    // Sending Cookie
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      Success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong.");
  }
};

exports.signout = (req, res) => {};
