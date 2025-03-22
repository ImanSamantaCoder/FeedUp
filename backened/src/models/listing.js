import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  caption: String,
  insertText: String,
  imageUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likesCount: { type: Number, default: 0 },  // ✅ Ensure default is 0
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]  // ✅ Store user IDs
});


const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
