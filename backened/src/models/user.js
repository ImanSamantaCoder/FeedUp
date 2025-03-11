import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
});

// ✅ Apply passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

// ✅ Export the model correctly
const User = mongoose.model("User", userSchema);
export default User;
