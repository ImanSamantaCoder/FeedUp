import express from "express";
import multer from "multer";
import { cloudinary } from "../cloudConfig.js";
import Listing from "../Models/listing.js";
import mongoose from "mongoose";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const listings = await Listing.find().populate("owner", "username email");
      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })
  .post(upload.single("image"), async (req, res) => {
    try {
      const { caption, insertText,owner } = req.body;
      console.log("Request body:", req.body);

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded!" });
      }

      console.log("Uploading to Cloudinary...");

      // Convert the file buffer to a Data URI
      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      console.log("Data URI (first 100 chars):", dataUri.substring(0, 100));

      // Upload the image to Cloudinary using the data URI
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "posts",
      });

      console.log("Cloudinary upload successful:", result);

      const listing = new Listing({
        caption,
        insertText,
        imageUrl: result.secure_url,
        owner : owner
      });

      await listing.save();
      res.status(201).json({ message: "Post uploaded successfully!", post: listing });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the post by ID
      const post = await Listing.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found!" });
      }
  
      // ✅ Ensure only the post owner can delete it
      if (!req.user || post.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized! You can only delete your own posts." });
      }
  
      // Delete the post
      await Listing.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  router.get("/check-auth", (req, res) => {
    console.log("Session Data:", req.session);
    console.log("Authenticated User:", req.user);
    res.json({ authenticated: !!req.user, user: req.user });
  });
  router.post("/:id/like", async (req, res) => {
    try {
      console.log("✅ Like route hit for post:", req.params.id);
      
      if (!req.user) {
        console.log("❌ Unauthorized: req.user is missing");
        return res.status(401).json({ message: "Unauthorized! Please log in." });
      }
  
      console.log("🔍 User trying to like post:", req.user._id);
  
      const post = await Listing.findById(req.params.id);
      if (!post) {
        console.log("❌ Post not found");
        return res.status(404).json({ message: "Post not found" });
      }
  
      console.log("Post found:", post);
  
      const alreadyLiked = post.likedBy.includes(req.user._id);
      if (alreadyLiked) {
        console.log("✅ User already liked the post, removing like...");
        post.likedBy = post.likedBy.filter(id => id.toString() !== req.user._id.toString());
        post.likesCount -= 1;
      } else {
        console.log("✅ User has not liked the post, adding like...");
        post.likedBy.push(req.user._id);
        post.likesCount += 1;
      }
  
      await post.save();
      console.log("✅ Updated Post:", post);
  
      res.json({ likesCount: post.likesCount, likedBy: post.likedBy });
    } catch (error) {
      console.error("🔥 Error in like route:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

router.get("/:id/like", async (req, res) => {
    console.log("Request ID:", req.params.id);

    try {
      const post = await Listing.findById(new mongoose.Types.ObjectId(req.params.id))
        .populate("likedBy");

      if (!post) {
        console.log("Post not found for ID:", req.params.id);
        return res.status(404).json({ message: "Post not found" });
      }

      console.log("listing router post", post);
      res.json({ likesCount: post.likesCount, likedBy: post.likedBy });
    } catch (error) {
      console.error("Server error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
});

  
  
  
  
export default router;
