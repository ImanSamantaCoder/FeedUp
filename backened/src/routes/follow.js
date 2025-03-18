import express from "express";
import User from "../models/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Follow a user
router.post("/:id", isAuthenticated, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow || !loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!loggedInUser.following.includes(userToFollow._id)) {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();
    }

    res.json({ message: "Followed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
});

// Unfollow a user
router.post("/unfollow/:id", isAuthenticated, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToUnfollow || !loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    loggedInUser.following = loggedInUser.following.filter(
      (id) => id.toString() !== req.params.id
    );

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await loggedInUser.save();
    await userToUnfollow.save();

    res.json({ message: "Unfollowed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error });
  }
});

export default router;
