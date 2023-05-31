const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
var fs = require("fs");
const JWT_SECRET = "abc1234$$";
// Create a User using : POST "/auth/" dosent require authentication

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadsDP/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.single("image"), // Handle single file upload with field name "image"
  [
    body("email", "Enter a valid email").isEmail(),

    body("name", "Minimum length of name should be 3").isLength({ min: 3 }),

    body("password", "Minimum password length should be 5").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // console.log("here");
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
      let imageData = null;
      if (req.file) {
        imageData = fs.readFileSync(`uploadsDp/${req.file.filename}`);
      }
      // create a new user with image field set to the path of the uploaded file (if any)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: secPass,
        image: {
          data: imageData,
          contentType: "image/png",
          // set image field to path of uploaded file if it exists, otherwise set it to null
        },
      });
      // console.log(req.file.filename);
      // get user id as data
      const data = {
        user: {
          id: user.id,
        },
      };

      // generate jwt authentication token
      const Authentication = jwt.sign(data, JWT_SECRET);

      res.json({ Authentication });
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
    // console.log(email, password);
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
      const Authentication = jwt.sign(data, JWT_SECRET);
      // console.log("in login", Authentication);
      res.json({ Authentication, msg: "login successfull" });
    } catch (error) {
      console.error(error.message);

      res.status(500).send("Internal server error");
    }
  }
);

// get a logged in user data : POST "/auth/getuser"  :requires authentication

router.post("/getuser", fetchUser, async (req, res) => {
  // console.log("in getuser", req.header("Authentication")); // print Authentication header value
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
    res.setHeader("Authentication", "");
    res.json({ msg: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// GET "/auth/user/:id" route: Get user data by ID (requires authentication)
router.get("/user/:id", fetchUser, async (req, res) => {
  try {
    const requestedUserId = req.params.id;

    // Find the user in the database
    const user = await User.findById(requestedUserId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
