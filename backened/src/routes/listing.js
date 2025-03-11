import express from "express";
import multer from "multer";
import { cloudinary } from "../cloudConfig.js";
import Listing from "../Models/listing.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const listings = await Listing.find();
      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  })
  .post(upload.single("image"), async (req, res) => {
    try {
      const { caption, insertText } = req.body;
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
      });

      await listing.save();
      res.status(201).json({ message: "Post uploaded successfully!", post: listing });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

export default router;
