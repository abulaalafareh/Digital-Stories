const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "abc1234$$";
// Create a User using : POST "/auth/" dosent require authentication

router.post(
  "/register",
  [
    body("email", "Enter a valid email").isEmail(),

    body("name", "Minimum length of name should be 3").isLength({ min: 3 }),

    body("password", "Minimum password length should be 5").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // cheacking if the user already exists
    try {
      let user = await User.findOne({ username: req.body.username });

      if (user) {
        return res

          .status(400)

          .json({ error: "This username is already in use" });
      }
      // encrypt the password with hashing it and adding salt for increased security
      const salt = await bcrypt.genSalt(10);

      let secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,

        email: req.body.email,

        username: req.body.username,

        password: secPass,
      });
      // get user id as data
      const data = {
        user: {
          id: user.id,
        },
      };
      // generate jwt authentication token
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);

      res.status(500).send("some error occurred");
    }
  }
);

// Login a User using : POST "/auth/login" dosent require authentication

router.post(
  "/login",
  // get data for login
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter correct credentials").exists(),
  ],

  async (req, res) => {
    // if there are errors return bad request and the error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // cheacking if the user already exists
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Enter correct credentials" });
      }
      // compare the entered password with saved password
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter correct credentials" });
      }

      // get user id as data
      const data = {
        user: {
          id: user.id,
        },
      };
      // generate jwt authentication token
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken, msg: "login successfull" });
    } catch (error) {
      console.error(error.message);

      res.status(500).send("Internal server error");
    }
  }
);

// get a logged in user data : POST "/auth/getuser"  :requires authentication

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    // select everything except password
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Internal server error");
  }
});

// logout a User using: DELETE "/auth/logout"  :requires authentication

router.delete("/logout", fetchUser, async (req, res) => {
  try {
    // update the token expiration time to a past date
    res.setHeader("auth-token", "");
    res.json({ msg: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
