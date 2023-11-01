// routes/auth.js
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jwt_secret = process.env.Jwt_secret;
const User = require("../models/userProfile"); // Your user model

// Validation middleware for user signup
const validateSignUp = [
  check("name", "Name is required").not().isEmpty(),
  check("userName", "Username is required").not().isEmpty(),
  check(
    "userName",
    "Username must contain only alphanumeric characters"
  ).isAlphanumeric(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

// Register a new user
module.exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if the user is already authenticated (logged in)
  // if (req.user) {
  //   return res.status(400).json({ msg: "You are already logged in" });
  // }

  let { name, email, password, userName, agreedToTerms } = req.body;
  userName = userName.toLowerCase();

  try {
    let user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists with that email or userName" });
    }

    user = new User({ name, email, userName, password, agreedToTerms });
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};

// Log in and get a token
module.exports.signIn = async (req, res) => {
  try {
    // Check if the user is already authenticated (logged in)
    // if (req.user) {
    //   return res.status(400).json({ msg: "You are already logged in" });
    // }
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure user input
    const { email, password } = req.body;

    //   if (!email || !password) {
    //     return res.status(422).json({ error: "Please add email and password" });
    //   }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create a JWT
    const payload = {
      id: user.id,
    };

    jwt.sign(payload, Jwt_secret, { expiresIn: "24h" }, (err, token) => {
      if (err) return res.status(500).json({ error: err });
      // Set an HttpOnly cookie containing the token
      // HttpOnly cookies are not accessible via JavaScript, which provides a higher level of security against certain types of attacks, such as cross-site scripting (XSS) attacks.
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ msg: "Signed in successfully" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.signOut = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    res.clearCookie("token");
    
    // also blacklist the token

    // Respond with a success message
    res.status(200).json({ msg: "Successfully signed out" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    // Retrieve the user's profile based on the user ID provided in the request params
    const userName = req.params.username;
    const userProfile = await User.findOne({ userName: userName })
      .select("-password")
      .populate("posts");

    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user profile data
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: error.message });
  }
};
