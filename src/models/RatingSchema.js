import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    liked: { type: Boolean, required: true },
    comment: { type: String },
    ratedAt: { type: Date, default: Date.now }
});

export default ratingSchema
