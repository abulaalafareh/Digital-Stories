var fetchUser = require("../middleware/fetchUser");
const Stories = require("../models/Stories");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

// ROUTE 1 : GET all the stories for a logged in user: using GET : "/stories/fetchallstories" : Login required
router.get("/fetchallstories", fetchUser, async (req, res) => {
  try {
    const stories = await Stories.find({ user: req.user.id });

    res.json(stories);
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Internal server error");
  }
});

// ROUTE 2 : POST a new story for a logged in user: using POST : "/stories/addstory" : Login required
router.post(
  "/addstory",
  fetchUser,
  [
    body("title", "Minimum length title should be 3").isLength({ min: 3 }),
    body("story", "Minimum length story should be 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    upload(req, res, (err) => {
      try {
        if (err) {
          console.log("err");
        } else {
          const newStory = new Stories({
            title: req.body.title,
            description: req.body.description,
            story: {
              data: req.file.filename,
              contentType: "image/png",
            },
            user: req.user.id,
          });
          newStory.save();
          res.send("Story uploaded");
        }
      } catch (error) {
        console.error(error.message);

        res.status(500).send("Internal server error");
      }
    });
  }
);

// ROUTE 3 : UPDATE a new story for a logged in user: using PUT : "/stories/updatestory" : Login required
router.put(
  "/updatestory/:id",
  fetchUser,
  [
    body("title", "Minimum length title should be 3").isLength({ min: 3 }),
    body("story", "Minimum length story should be 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, story } = req.body;
      // update a story
      const newStory = {};
      if (title) {
        newStory.title = title;
      }
      if (description) {
        newStory.description = description;
      }
      if (story) {
        newStory.story = story;
      }
      console.log(newStory);

      var user_story = await Stories.findById(req.params.id);
      if (!user_story) {
        return res.status(404).send("Not Found");
      }
      if (user_story.user.toString() !== req.user.id) {
        return res.status(401).send("Invalid Request");
      }

      user_story = await Stories.findByIdAndUpdate(
        req.params.id,
        { $set: newStory },
        { new: true }
      );
      res.json(user_story);
    } catch (error) {
      console.error(error.message);

      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 4 : DELETE a story for a logged in user: using DELETE : "/stories/deletestory" : Login required
router.delete("/deletestory/:id", fetchUser, async (req, res) => {
  try {
    var user_story = await Stories.findById(req.params.id);

    if (!user_story) {
      return res.status(404).send("Not Found");
    }

    //   allow delete only if the user owns this story

    if (user_story.user.toString() !== req.user.id) {
      return res.status(401).send("Invalid Request");
    }

    user_story = await Stories.findByIdAndDelete(req.params.id);
    res.json({ success: "Story has been deleted" });
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Internal server error");
  }
});

module.exports = router;

// simple text story upload code

// router.post(
//   "/addstory",
//   fetchUser,
//   [
//     body("title", "Minimum length title should be 3").isLength({ min: 3 }),
//     body("story", "Minimum length story should be 3").isLength({ min: 3 }),
//   ],
//   async (req, res) => {
//     try {
//       const { title, description, story } = req.body;

//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const user_story = new Stories({
//         title,
//         description,
//         story,
//         user: req.user.id,
//       });
//       const savedStory = await user_story.save();
//       res.json(savedStory);
//     } catch (error) {
//       console.error(error.message);

//       res.status(500).send("Internal server error");
//     }
//   }
// );
