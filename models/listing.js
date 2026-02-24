const mongoose = require("mongoose"); // import mongoose
const Review = require("./review.js");
const { Schema } = mongoose; // extract Schema

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1768409234914-96f61529b7e2?q=80&w=2070&auto=format&fit=crop",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1768409234914-96f61529b7e2?q=80&w=2070&auto=format&fit=crop"
                    : v,
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    };
});

module.exports = mongoose.model("Listing", listingSchema); // export the model
