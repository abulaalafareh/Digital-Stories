var fetchUser = require("../middleware/fetchUser");
const Stories = require("../models/Stories");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

// ROUTE 1 : GET all the stories for a logged in user: using GET : "/stories/fetchallstories" : Login required
router.get("/fetchalluserstories", fetchUser, async (req, res) => {
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
    body("type", "Type is required").notEmpty(),
    body("story.data", "Story data is required").notEmpty(),
  ],
  async (req, res) => {
    upload(req, res, async (err) => {
      try {
        let data = null;
        if (req.file && req.file.filename) {
          data = {
            data: req.file.filename,
            contentType: req.body.contentType,
          };
          console.log("data", data);
        }
        console.log(req.body);
        const newStory = new Stories({
          type: req.body.type,
          status: req.body.status,
          description: req.body.description,
          multimedia: data,
          contentType: req.body.contentType,
          text: req.body.text,
          color: req.body.color,
          font: req.body.font,
          background_color: req.body.background_color,
          user: req.user.id,
        });

        await newStory.save();
        res.send("Story uploaded");
        console.log(newStory);
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
  [body("type", "Type is required").notEmpty()],
  async (req, res) => {
    upload(req, res, async (err) => {
      try {
        const { text, status, background_color, color, font, description } =
          req.body;
        // console.log(text, status, background_color, color, font);
        // update a story
        const newStory = {};
        if (text) {
          newStory.text = text;
        }
        if (description) {
          newStory.description = description;
        }
        if (status !== undefined) {
          newStory.status = status;
        }
        if (color) {
          newStory.color = color;
        }
        if (background_color) {
          newStory.background_color = background_color;
        }
        if (font) {
          newStory.font = font;
        }
        console.log(newStory);

        var user_story = await Stories.findById(req.params.id);
        if (!user_story) {
          return res.status(404).send("Not Found");
        }
        if (user_story.user.toString() !== req.user.id) {
          return res.status(401).send("Invalid Request");
        }

        if (req.file && req.file.filename) {
          newStory.story.data = req.file.filename;
          newStory.story.contentType = req.file.mimetype;
        }

        await Stories.findByIdAndUpdate(req.params.id, { $set: newStory });
        const updatedStory = await Stories.findById(req.params.id);
        res.json(updatedStory);
      } catch (error) {
        console.error(error.message);

        res.status(500).send("Internal server error");
      }
    });
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
// Route 5 fetch all stories from database : login required
router.get("/fetchallstories", async (req, res) => {
  try {
    const stories = await Stories.find();

    res.json(stories);
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
