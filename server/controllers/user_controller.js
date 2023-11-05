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
      res.status(200).json({
        msg: "Signed in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userName: user.userName,
          profilePhoto: user.profilePhoto,
          // Include any other user properties to return
        },
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.signOut = async (req, res) => {
  try {
    const token = req.cookies.token;
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

module.exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const updatedProfile = req.body;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (updatedProfile.password) {
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(updatedProfile.password, 12);
      user.password = hashedPassword;
    }

    if (updatedProfile.userName) {
      let tempUser = await User.findOne({
        userName: updatedProfile.userName.toLowerCase(),
      });
      if (tempUser && tempUser.id != user.id) {
        return res
          .status(400)
          .json({ msg: "User already exists with that username" });
      }
      user.userName = updatedProfile.userName.toLowerCase();
    }

    // Use the OR operator (||) to update fields if they exist in the request body
    user.name = updatedProfile.name || user.name;
    user.about = updatedProfile.about || user.about;
    user.college = updatedProfile.college || user.college;
    user.yearOfStudy = updatedProfile.yearOfStudy || user.yearOfStudy;
    user.linkedin = updatedProfile.linkedin || user.linkedin;
    user.github = updatedProfile.github || user.github;
    user.twitter = updatedProfile.twitter || user.twitter;
    user.profilePhoto = updatedProfile.profilePhoto || user.profilePhoto;
    user.backgroundBanner =
      updatedProfile.backgroundBanner || user.backgroundBanner;

    // Save the updated user profile
    await user.save();

    // after response, update the context
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        profilePhoto: user.profilePhoto,
        // Include any other user properties to return
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.checkAuth = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({
      msg: "User is authenticated.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        profilePhoto: user.profilePhoto,
        // Include any other user properties to return
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
