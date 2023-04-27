const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Vote = require("../models/Votes");
const Stories = require("../models/Stories");

// Upvote a story
router.post("/upvote/:storyId", fetchUser, async (req, res) => {
  try {
    const { storyId } = req.params;

    // Check if the story exists
    const storyExists = await Stories.exists({ _id: storyId });
    if (!storyExists) {
      return res.status(404).json({ msg: "Story not found" });
    }

    // Check if the user has already voted on the story
    const existingVote = await Vote.findOne({
      user: req.user.id,
      story: storyId,
    });
    if (existingVote) {
      if (existingVote.upvote === true) {
        existingVote.upvote = false;
        existingVote.downvote = false;
        await existingVote.save();
        return res.status(200).json({ msg: "Upvote removed" });
      } else if (existingVote.downvote === true) {
        existingVote.upvote = true;
        existingVote.downvote = false;
        await existingVote.save();
        return res.status(200).json({ msg: "Downvote changed to Upvote" });
      } else if (
        existingVote.upvote === false &&
        existingVote.downvote === false
      ) {
        existingVote.upvote = true;
        await existingVote.save();
        return res.status(200).json({ msg: "Upvoted" });
      }
    } else {
      // Create a new vote
      const vote = new Vote({
        upvote: true,
        user: req.user.id,
        story: storyId,
      });
      console.log("mark5");
      await vote.save();
      return res.status(200).json({ msg: "Upvoted!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Downvote a story
router.post("/downvote/:storyId", fetchUser, async (req, res) => {
  try {
    const { storyId } = req.params;

    // Check if the story exists
    const storyExists = await Stories.exists({ _id: storyId });
    if (!storyExists) {
      return res.status(404).json({ msg: "Story not found" });
    }

    // Check if the user has already voted on the story
    const existingVote = await Vote.findOne({
      user: req.user.id,
      story: storyId,
    });

    if (existingVote) {
      if (existingVote.downvote === true) {
        existingVote.downvote = false;
        existingVote.upvote = false;
        await existingVote.save();
        return res.status(200).json({ msg: "Downvote removed" });
      } else if (existingVote.upvote === true) {
        existingVote.downvote = true;
        existingVote.upvote = false;
        await existingVote.save();
        return res.status(200).json({ msg: "Upvote changed to Downvote" });
      } else if (
        existingVote.upvote === false &&
        existingVote.downvote === false
      ) {
        existingVote.downvote = true;
        await existingVote.save();
        return res.status(200).json({ msg: "downvoted" });
      }
    } else {
      // Create a new vote
      const vote = new Vote({
        downvote: true,
        user: req.user.id,
        story: storyId,
      });
      await vote.save();
      return res.status(200).json({ msg: "Downvoted!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch all upvotes for a story
router.get("/upvotes/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const upvotes = await Vote.find({ story: storyId, upvote: true });
    return res.status(200).json(upvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch all downvotes for a story
router.get("/downvotes/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const downvotes = await Vote.find({ story: storyId, downvote: true });
    return res.status(200).json(downvotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
