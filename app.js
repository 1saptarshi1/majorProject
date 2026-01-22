const express = require("express");
const app = express();
const  mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("view", path)

app.get("/", (req, res) => {
    res.send("Hi, Iam root");
});

app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("index.ejs", {allListing});
});

// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By The Beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succssful testing");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});