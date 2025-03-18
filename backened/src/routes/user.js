import express from "express";
import passport from "passport";
import User from "../models/user.js"; // ✅ Import correctly
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.get("/users", isAuthenticated, async (req, res) => {
    try {
      const users = await User.find({ _id: { $ne: req.user._id } });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });
  
router.post("/signup", async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        console.log("Received Signup Data:", req.body);

        const newUser = new User({ email, username });
        console.log(req.user);

        // Register user with passport
        const registeredUser = await User.register(newUser, password);

        // Log the user in after successful registration
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            return res.status(201).json({ success: true, message: "Signup successful!", user: registeredUser });
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, message: "Login successful!", user: req.user });
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ success: true, message: "Logged out successfully!" });
    });
});

export default router; // ✅ Use `export default` instead of `module.exports`
