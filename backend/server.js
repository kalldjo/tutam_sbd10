const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Movie = require("./models/Movie");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));


//read
app.get("/movies", async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});


//create
app.post("/movies", async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
    });

    await movie.save();
    res.json(movie);
});


//delete
app.delete("/movies/:id", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});