import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String, // Managed by passport-local-mongoose
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Storing user's posts
});

userSchema.plugin(passportLocalMongoose); // ✅ Enables authentication methods

const User = mongoose.model("User", userSchema);
export default User;