import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // This field is managed by passport-local-mongoose
});

userSchema.plugin(passportLocalMongoose); // ✅ Enables authentication methods

const User = mongoose.model("User", userSchema);
export default User;
