const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }
    next();
};

// INDEX
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// NEW
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// SHOW
router.get("/:id", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate({"path": "reviews", populate: {"path": "author"}}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner of the listing to the currently logged-in user
    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
}));

// EDIT
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// UPDATE
router.put("/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${req.params.id}`);
}));

// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}));

module.exports = router;