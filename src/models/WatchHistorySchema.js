import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    startedAt: { type: Date, default: Date.now },
    finishedAt: { type: Date }
});