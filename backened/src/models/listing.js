import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  insertText: { type: String },
  imageUrl: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate with user
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
