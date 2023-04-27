var fetchUser = require("../middleware/fetchUser");
const Comment = require("../models/Comments");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all comments for a specific story
router.get("/fetchallcomments/story/:storyId", async (req, res) => {
  try {
    const comments = await Comment.find({ story: req.params.storyId });
    res.json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Add a new comment to a story
router.post(
  "/addcomment/story/:storyId",
  fetchUser,
  [body("body", "Minimum length of comment should be 1").isLength({ min: 1 })],
  async (req, res) => {
    try {
      const { body } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newComment = new Comment({
        user: req.user.id,
        story: req.params.storyId,
        body,
      });

      const comment = await newComment.save();

      res.json(comment);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update a comment
router.put(
  "/updatecomment/:id",
  fetchUser,
  [
    [
      body("body", "Minimum length of comment should be 1").isLength({
        min: 1,
      }),
    ],
  ],
  async (req, res) => {
    try {
      const { body } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      comment = await Comment.findByIdAndUpdate(
        req.params.id,
        { body },
        { new: true }
      );

      res.json(comment);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 4: Delete a comment
router.delete("/deletecomment/:id", fetchUser, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Comment.findByIdAndRemove(req.params.id);

    res.json({ msg: "Comment removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
