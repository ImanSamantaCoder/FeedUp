import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import LocalStrategy from "passport-local";
import cors from "cors";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import methodOverride from "method-override";
import listingsRouter from "./routes/listing.js";
import User from "./models/user.js";
import userRouter from "./routes/user.js";

dotenv.config(); // Loads .env file into process.env

const app = express();
const port = 8000;

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/facebooknewone");
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
main();

// Session Configuration
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Serve static files (Fix for __dirname)
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Middleware for setting `currUser`
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/listings", listingsRouter);
app.use("/auth", userRouter);

// 404 Handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
