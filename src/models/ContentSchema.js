import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    contentType: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    durationMin: { type: Number, required: true },
    ageRating: { type: String, required: true },
});

export default contentSchema
