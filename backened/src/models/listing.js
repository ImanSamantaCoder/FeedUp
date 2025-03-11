import mongoose from "mongoose"
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    caption :String,
    imageUrl : String,
    insertText : String,
   
})
const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;