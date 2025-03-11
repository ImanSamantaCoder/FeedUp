const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    console.log("Fetched Listings:", allListings);
    res.json(allListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createNewListing = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const newListing = new Listing(req.body.listing);
    await newListing.save();

    console.log("Created New Listing:", newListing);

    // Redirect to the home page or listing page after posting
    res.redirect("/");
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Failed to create listing" });
  }
};
