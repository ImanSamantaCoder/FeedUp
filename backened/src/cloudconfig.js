import { v2 as cloudinary } from "cloudinary";

// Hardcoded Cloudinary credentials
cloudinary.config({
  cloud_name: "dupftwakn",    // Replace with your Cloudinary cloud name
  api_key: "764446765596974",          // Replace with your Cloudinary API key
  api_secret: "8gEcvT55SQyhOI5K0iSymiYt0ts",    // Replace with your Cloudinary API secret
});

export { cloudinary };
